import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../Context/Context";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { addToCart, userRole } = useAppContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        setProduct(response.data);
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      navigate("/home");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handlAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };

  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }

  return (
    <>
      <div className="containers" style={{ display: "flex" }}>
        <img
          className="left-column-img"
          src={imageUrl}
          alt={product.imageName}
          style={{ width: "50%", height: "auto" }}
        />

        <div className="right-column" style={{ width: "50%" }}>
          <div className="product-description">
            <div style={{display:'flex',justifyContent:'space-between' }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 'lighter' }}>
                {product.category}
              </span>
              <p className="release-date" style={{ marginBottom: "2rem" }}>
                <h6>Listed : <span> <i> {new Date(product.releaseDate).toLocaleDateString()}</i></span></h6>
              </p>
            </div>
            
            <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem",textTransform: 'capitalize', letterSpacing:'1px' }}>
              {product.name}
            </h1>
            <i style={{ marginBottom: "3rem" }}>{product.brand}</i>
            <p style={{fontWeight:'bold',fontSize:'1rem',margin:'10px 0px 0px'}}>PRODUCT DESCRIPTION :</p>
            <p style={{ marginBottom: "1rem" }}>{product.description}</p>
          </div>

          <div className="product-price">
            <span>${product.price}</span>
            <button
              className="cart-btn"
              onClick={handlAddToCart}
              style={{ marginTop: "1rem" }}
            >
              Add to Cart
            </button>
          </div>

          {userRole === 'ADMIN' && (
            <div className="update-button" style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleEditClick}
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={deleteProduct}
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;