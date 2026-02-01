import { createContext, useState, useEffect, useContext, useCallback } from "react";
import API from "../api/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Cart - useCallback to avoid warnings
  const fetchCart = useCallback(() => {
    if (!user) return;
    
    setLoading(true);
    API.get(`/api/cart/${user.id}`)
    .then((res) => setCart(res.data))
      .catch(() => setCart([]))
      .finally(() => setLoading(false));
  }, [user]);

  // Fetch cart whenever user logs in
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }
    fetchCart();
  }, [user, fetchCart]);

  // Add Item to Cart in DB
  const addToCart = (product_id) => {
    if (!user) return alert("Please login to add items to cart!");

    API.post("/api/cart/add", { user_id: user.id, product_id })
    .then(() => fetchCart())
      .catch((err) => console.error(err));
  };

  // Remove a product from cart
  const removeFromCart = (product_id) => {
    API.delete(`/api/cart/remove/${user.id}/${product_id}`)
    .then(() => fetchCart())
      .catch((err) => console.error(err));
  };

  // Change Quantity
  const updateQty = (product_id, action) => {
    const item = cart.find((i) => i.product_id === product_id);
    if (!item) return;

    const qty = action === "inc" ? item.qty + 1 : item.qty - 1;
    if (qty < 1) return;

    API.put("/api/cart/update-qty", {
      user_id: user.id,
      product_id,
      qty,
    })
      .then(() => fetchCart())
      .catch((err) => console.error(err));
  };

  // Total Price
  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.farmer_price) * Number(item.qty),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQty,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
