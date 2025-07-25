import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";
import Swal from "sweetalert2";

const Home = ({ selectedCategory }) => {
    const { data, isError, addToCart, refreshData } = useContext(AppContext);
    const [products, setProducts] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const fetchImagesAndUpdateProducts = async (productsData) => {
        try {
            // Nettoyer les anciennes URLs
            products.forEach(product => {
                if (product.imageUrl && product.imageUrl !== unplugged) {
                    URL.revokeObjectURL(product.imageUrl);
                }
            });

                    const updatedProducts = await Promise.all(
                productsData.map(async (product) => {
                            try {
                                const token = localStorage.getItem("token");
                                const response = await axios.get(
                                    `http://localhost:8081/api/product/${product.id}/image`,
                                    {
                                        responseType: "blob",
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                );
                                const imageUrl = URL.createObjectURL(response.data);
                                return { ...product, imageUrl };
                            } catch (error) {
                                console.error(
                                    "Erreur de récupération d'image pour le produit ID:",
                                    product.id,
                                    error
                                );
                                return {
                                    ...product,
                                    imageUrl: unplugged,
                                };
                            }
                        })
                    );
                    setProducts(updatedProducts);
                } catch (error) {
                    console.error("Erreur lors de la récupération des images:", error);
                }
        };

    useEffect(() => {
        if (!isDataFetched) {
            refreshData();
            setIsDataFetched(true);
        }
    }, [refreshData, isDataFetched]);

    useEffect(() => {
        if (data && data.length > 0) {
            fetchImagesAndUpdateProducts(data);
        }

        return () => {
            products.forEach(product => {
                if (product.imageUrl && product.imageUrl !== unplugged) {
                    URL.revokeObjectURL(product.imageUrl);
                }
            });
        };
    }, [data]);

    const handleAddToCart = async (product) => {
        try {
            await addToCart(product);
            await refreshData();
            await fetchImagesAndUpdateProducts(data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product added to cart successfly",
                showConfirmButton: false,
                timer: 1000,
                width: '250px'
            });
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add product to cart");
        }
    };

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

    if (isError) {
        return (
            <h2 className="text-center" style={{ padding: "18rem" }}>
                <img src={unplugged} alt="Error" style={{ width: "100px", height: "100px" }} />
            </h2>
        );
    }

    return (
        <div
            className="grid"
            style={{
                marginTop: "64px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                padding: "20px",
            }}
        >
            {filteredProducts.length === 0 ? (
                <h2
                    className="text-center"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    No Products Available
                </h2>
            ) : (
                filteredProducts.map((product) => {
                    const { id, brand, name, price, productAvailable, imageUrl } = product;
                    return (
                        <div
                            className="card mb-3"
                            style={{
                                width: "250px",
                                height: "360px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                borderRadius: "10px",
                                overflow: "hidden",
                                backgroundColor: productAvailable ? "#fff" : "#ccc",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: 'flex-start',
                                alignItems: 'stretch'
                            }}
                            key={id}
                        >
                            <Link
                                to={`/product/${id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <img
                                    src={imageUrl}
                                    alt={name}
                                    style={{
                                        width: "100%",
                                        height: "150px",
                                        objectFit: "cover",
                                        padding: "5px",
                                        margin: "0",
                                        borderRadius: "10px 10px 10px 10px",
                                    }}
                                />
                                <div
                                    className="card-body"
                                    style={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        padding: "10px",
                                    }}
                                >
                                    <div>
                                        <h5
                                            className="card-title"
                                            style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}
                                        >
                                            {name.toUpperCase()}
                                        </h5>
                                        <i
                                            className="card-brand"
                                            style={{ fontStyle: "italic", fontSize: "0.8rem" }}
                                        >
                                            {"~ " + brand}
                                        </i>
                                    </div>
                                    <hr className="hr-line" style={{ margin: "10px 0" }} />
                                    <div className="home-cart-price">
                                        <h5
                                            className="card-text"
                                            style={{
                                                fontWeight: "600",
                                                fontSize: "1.1rem",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            <i className="bi bi-currency-rupee"></i>
                                            {price}
                                        </h5>
                                    </div>
                                    <button
                                        className="btn-hover color-9"
                                        style={{ margin: "10px 25px 0px" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleAddToCart(product);
                                        }}
                                        disabled={!productAvailable}
                                    >
                                        {productAvailable ? "Add to Cart" : "Out of Stock"}
                                    </button>
                                </div>
                            </Link>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Home;
