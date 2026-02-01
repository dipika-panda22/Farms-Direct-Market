import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { name } = useParams();
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);
  const { addToCart, updateQty, cart } = useContext(CartContext);

  useEffect(() => {
    API.get(`/api/products/offers/${name}`)
    .then((res) => setOffers(res.data))
      .catch(() => setOffers([]));
  }, [name]);

  const handleAddToCart = (item) => {
    if (!user) return toast.error("Please login to add products to cart!");
  
    const existingItem = cart.find((p) => p.product_id === item.id);
  
    if (existingItem) {
      updateQty(item.id, "inc");
      toast.success(`Increased quantity of ${item.name} 🛒`);
    } else {
      addToCart(item.id);
      toast.success(`${item.name} added to cart! 🎉`);
    }
  };
  

  const backPage = user?.role === "user" ? "/user-dashboard" : "/";

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{name} – Farm Offers 🌾</h2>

      <Link to={backPage} style={styles.backBtn}>
        ⬅ Back
      </Link>

      {offers.length === 0 ? (
        <p>No farmers selling this product currently.</p>
      ) : (
        <div style={styles.grid}>
          {offers.map((item) => (
            <div key={item.id} style={styles.card}>
              <img
                src={item.image_url || "https://via.placeholder.com/200"}
                style={styles.image}
                alt={item.name}
              />

              <h3 style={styles.name}>{item.name}</h3>
              <p style={styles.price}>₹{item.farmer_price} (500gm)</p>
              <p>👨‍🌾 Farmer ID: {item.farmer_id}</p>
              <p>📍 {item.location}</p>

              <button
                style={styles.cartBtn}
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart 🛒
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px", textAlign: "center" },
  title: { fontSize: "28px", color: "#1b5e20", fontWeight: "bold" },
  backBtn: {
    padding: "8px 14px",
    background: "#2e7d32",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
    position: "absolute",
    left: "20px",
    top: "80px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "160px",
    borderRadius: "8px",
    objectFit: "cover",
    marginBottom: "10px",
  },
  name: { fontWeight: "600" },
  price: { fontSize: "18px", fontWeight: "bold", color: "#1b5e20" },
  cartBtn: {
    marginTop: "10px",
    background: "#1b5e20",
    color: "#fff",
    width: "100%",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
