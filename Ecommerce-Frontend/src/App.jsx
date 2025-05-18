import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import UpdateProduct from "./components/UpdateProduct";
import Users from "./components/Users";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";


function AppContent() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
          cart.map((item) =>
              item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
          )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
      <>
        {/* On cache le Navbar sur /login et /register */}
        {location.pathname !== "/login" && location.pathname !== "/register" && (
            <Navbar onSelectCategory={handleCategorySelect} />
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home selectedCategory={selectedCategory} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </>
  );
}

function App() {
  return (
      <AppProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AppProvider>
  );
}

export default App;
