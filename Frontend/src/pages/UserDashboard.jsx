import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/api/products/customer")
    .then((res) => {
        console.log("Customer products:", res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter based on search input
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛒 Buy Fresh From Farmers</h2>

      <input
        style={styles.search}
        placeholder="Search fruits, vegetables, essentials..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={styles.grid}>
        {filteredProducts.map((item) => (
          <div key={item.id} style={styles.card}>
            <img
              src={item.image_url || "https://via.placeholder.com/200"}
              alt={item.name}
              style={styles.image}
            />
            <h3 style={styles.name}>{item.name}</h3>

            <button
  style={styles.button}
  onClick={() =>
    navigate(`/product/${item.name}`, {
      state: { product: item }  // pass image + price if available
    })
  }
>
  View Farmer Prices ➜
</button>

          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  title: {
    color: "#1b5e20",
    fontWeight: "bold",
    fontSize: "26px",
    marginBottom: "20px",
  },
  search: {
    padding: "12px",
    width: "300px",
    borderRadius: "6px",
    border: "1px solid #aaa",
    outline: "none",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "12px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  name: {
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: "8px",
  },
  button: {
    width: "100%",
    backgroundColor: "#1b5e20",
    color: "#fff",
    borderRadius: "6px",
    padding: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
  },
};
