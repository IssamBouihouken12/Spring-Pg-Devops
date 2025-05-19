import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { addToCart, userRole, refreshData } = useAppContext();

  const fetchProductData = async () => {
    try {
      if (imageUrl && imageUrl !== unplugged) {
        URL.revokeObjectURL(imageUrl);
      }

      const response = await axios.get(`http://localhost:8081/api/product/${id}`);
      setProduct(response.data);
      
      const token = localStorage.getItem("token");
      const imageResponse = await axios.get(
        `http://localhost:8081/api/product/${id}/image`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newImageUrl = URL.createObjectURL(imageResponse.data);
      setImageUrl(newImageUrl);
    } catch (error) {
      console.error("Error fetching product:", error);
      setImageUrl(unplugged);
    }
  };

  useEffect(() => {
    fetchProductData();
    refreshData();

    return () => {
      if (imageUrl && imageUrl !== unplugged) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [id]);

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const deleteProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete a product");
        return;
      }

      const confirmed = window.confirm("Are you sure you want to delete this product?");
      if (!confirmed) {
        return;
      }

      await axios.delete(`http://localhost:8081/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      alert("Product deleted successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error deleting product:", error);
      if (error.response) {
        alert(error.response.data.message || "Failed to delete product");
      } else {
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const handlAddToCart = async () => {
    try {
      await addToCart(product);
      await refreshData();
      await fetchProductData();
      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart");
    }
  };

  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div style={{ 
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      marginTop: '80px'
    }}>
      <div style={{ 
        display: "flex",
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
        gap: '2rem',
        padding: '1rem'
      }}>
        <div style={{
          flex: '1',
          minWidth: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img
            src={imageUrl}
            alt={product.imageName}
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        <div style={{
          flex: '1',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <span style={{ 
                fontSize: "1.2rem", 
                fontWeight: 'lighter',
                color: '#666'
              }}>
                {product.category}
              </span>
              <p style={{ 
                margin: 0,
                fontSize: '0.9rem',
                color: '#666'
              }}>
                Listed: <i>{new Date(product.releaseDate).toLocaleDateString()}</i>
              </p>
            </div>
            
            <h1 style={{ 
              fontSize: "2rem", 
              marginBottom: "0.5rem",
              textTransform: 'capitalize', 
              letterSpacing: '1px',
              color: '#333'
            }}>
              {product.name}
            </h1>
            <i style={{ 
              color: '#666',
              fontSize: '1.1rem'
            }}>
              {product.brand}
            </i>
          </div>

          <div>
            <p style={{
              fontWeight: 'bold',
              fontSize: '1rem',
              margin: '10px 0',
              color: '#333'
            }}>
              PRODUCT DESCRIPTION:
            </p>
            <p style={{ 
              marginBottom: "1rem",
              lineHeight: '1.6',
              color: '#666'
            }}>
              {product.description}
            </p>
          </div>

          <div style={{
            marginTop: 'auto',
            paddingTop: '1rem',
            borderTop: '1px solid #eee'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#333'
              }}>
                ${product.price}
              </span>
              <button
                onClick={handlAddToCart}
                style={{
                  padding: '0.8rem 2rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.3s ease',
                  ':hover': {
                    backgroundColor: '#0056b3'
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {userRole === 'ADMIN' && (
            <div style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1rem",
              flexWrap: 'wrap'
            }}>
              <button
                onClick={handleEditClick}
                style={{
                  padding: "0.8rem 2rem",
                  fontSize: "1rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: 'background-color 0.3s ease'
                }}
              >
                Update
              </button>
              <button
                onClick={deleteProduct}
                style={{
                  padding: "0.8rem 2rem",
                  fontSize: "1rem",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: 'background-color 0.3s ease'
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;