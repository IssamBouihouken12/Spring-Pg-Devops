import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setProduct({...product, image: e.target.files[0]})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
        "product",
        new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
        .post("http://localhost:8081/api/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Product added successfully:", response.data);
          alert("Product added successfully");
        })
        .catch((error) => {
          console.error("Erreur complète :", error.response ? error.response.data : error.message);
          alert("Erreur: " + (error.response ? error.response.data : error.message));
        });
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      marginTop: '80px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '2rem',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          marginBottom: '2rem',
          color: '#333',
          textAlign: 'center'
        }}>Add New Product</h2>

        <form onSubmit={submitHandler} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              style={inputStyle}
              placeholder="Product Name"
              onChange={handleInputChange}
              value={product.name}
              name="name"
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Brand</label>
            <input
              type="text"
              name="brand"
              style={inputStyle}
              placeholder="Enter your Brand"
              value={product.brand}
              onChange={handleInputChange}
            />
          </div>

          <div style={{
            ...formGroupStyle,
            gridColumn: '1 / -1'
          }}>
            <label style={labelStyle}>Description</label>
            <textarea
              style={{
                ...inputStyle,
                minHeight: '100px',
                resize: 'vertical'
              }}
              placeholder="Add product description"
              value={product.description}
              name="description"
              onChange={handleInputChange}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Price</label>
            <input
              type="number"
              style={inputStyle}
              placeholder="Eg: $1000"
              onChange={handleInputChange}
              value={product.price}
              name="price"
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Category</label>
            <select
              style={inputStyle}
              value={product.category}
              onChange={handleInputChange}
              name="category"
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Stock Quantity</label>
            <input
              type="number"
              style={inputStyle}
              placeholder="Stock Remaining"
              onChange={handleInputChange}
              value={product.stockQuantity}
              name="stockQuantity"
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Release Date</label>
            <input
              type="date"
              style={inputStyle}
              value={product.releaseDate}
              name="releaseDate"
              onChange={handleInputChange}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Image</label>
            <input
              style={{
                ...inputStyle,
                padding: '0.5rem 0'
              }}
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </div>

          <div style={{
            ...formGroupStyle,
            gridColumn: '1 / -1',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <input
              type="checkbox"
              name="productAvailable"
              checked={product.productAvailable}
              onChange={(e) =>
                setProduct({ ...product, productAvailable: e.target.checked })
              }
              style={{
                width: '20px',
                height: '20px'
              }}
            />
            <label style={{
              ...labelStyle,
              margin: 0
            }}>Product Available</label>
          </div>

          <div style={{
            gridColumn: '1 / -1',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            <button
              type="submit"
              style={submitButtonStyle}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styles
const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const labelStyle = {
  color: '#495057',
  fontWeight: '500',
  fontSize: '0.9rem'
};

const inputStyle = {
  padding: '0.75rem',
  border: '1px solid #ced4da',
  borderRadius: '5px',
  fontSize: '1rem',
  width: '100%',
  transition: 'border-color 0.3s ease',
  ':focus': {
    borderColor: '#007bff',
    outline: 'none'
  }
};

const submitButtonStyle = {
  padding: '0.75rem 2rem',
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
};

export default AddProduct;