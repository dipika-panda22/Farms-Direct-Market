// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import FarmerDashboard from "./components/Farmer/FarmerDashboard";
import UserDashboard from "./pages/UserDashboard";
import MyAccount from "./pages/MyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Layout/Navbar";
import PrivateRoute from "./components/HOC/PrivateRoute";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
import ProductsShowcase from "./pages/ProductsPage";

import { CartProvider } from "./context/CartContext";

// 🔥 Import Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsShowcase />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/product/:name" element={<ProductDetails />} />

          {/* User Routes */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Farmer Protected Route */}
          <Route
            path="/farmer-dashboard"
            element={
              <PrivateRoute role="farmer">
                <FarmerDashboard />
              </PrivateRoute>
            }
          />
        </Routes>

        {/* 🚀 Add Below */}
        <ToastContainer position="top-right" autoClose={2000} />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
