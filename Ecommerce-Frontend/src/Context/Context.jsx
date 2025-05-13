import axios from "../axios";
import { useState, useEffect, createContext, useContext } from "react";

const AppContext = createContext({
  data: [],
  isError: "",
  cart: [],
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  refreshData:() =>{},
  updateStockQuantity: (productId, newQuantity) =>{}
  
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (productId) => {
    console.log("productID",productId)
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log("CART",cart)
  };

  const refreshData = async () => {
    try {
      const response = await axios.get("/products");
      setData(response.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  const clearCart =() =>{
    setCart([]);
  }
  
  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");
    if (storedRole && token) {
      setUserRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (role, token) => {
    setUserRole(role);
    setIsAuthenticated(true);
    localStorage.setItem("userRole", role);
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };

  const logout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AppContext.Provider value={{ data, isError, cart, addToCart, removeFromCart,refreshData, clearCart, userRole, isAuthenticated, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;