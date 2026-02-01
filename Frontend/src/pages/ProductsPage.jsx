import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function ProductsPage() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 🚫 REMOVE PRODUCTS PAGE AFTER LOGIN
  useEffect(() => {
    if (user) {
      navigate(
        user.role === "farmer"
          ? "/farmer-dashboard"
          : "/user-dashboard",
        { replace: true }
      );
    }
  }, [user, navigate]);

  // 📦 FETCH PRODUCTS ONLY FOR GUESTS
  useEffect(() => {
    if (!user) {
      API.get("/api/products/customer")
        .then((res) => setProducts(res.data))
        .catch((err) => {
          console.error("Error fetching products", err);
          setProducts([]);
        });
    }
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={styles.title}>🌱 Discover Fresh Harvests Near You 🌱</h2>

      {products.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No products found.
        </p>
      ) : (
        <div style={styles.grid}>
          {products.map((item) => (
            <div key={item.id} style={styles.card}>
              <img
                src={item.image_url || "https://via.placeholder.com/200"}
                alt={item.name}
                style={styles.image}
              />

              <h3 style={styles.name}>{item.name}</h3>

              <p style={styles.loginMsg}>🔐 Login to see price</p>

              <button
                style={{
                  ...styles.cartBtn,
                  opacity: 0.6,
                  cursor: "not-allowed",
                }}
                disabled
              >
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  title: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "700",
    color: "#1b5e20",
    marginBottom: "25px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#2e7d32",
  },
  loginMsg: {
    marginTop: "12px",
    color: "#c62828",
    fontWeight: "bold",
  },
  cartBtn: {
    marginTop: "10px",
    background: "#1b5e20",
    color: "#fff",
    border: "none",
    padding: "8px",
    width: "100%",
    borderRadius: "6px",
    fontWeight: "bold",
  },
};
