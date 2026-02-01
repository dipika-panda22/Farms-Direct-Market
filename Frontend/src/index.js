import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);

