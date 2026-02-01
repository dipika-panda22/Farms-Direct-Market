import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api/api";

export default function FarmerDashboard() {
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState({
    id: null,
    name: "",
    category: "",
    farmer_price: "",
    market_price: "",
    quantity: "",
    image_url: "",
  });

  const [myProducts, setMyProducts] = useState([]);

  // Load only logged-in farmer's products
  const refreshProducts = useCallback(() => {
    if (!user?.id) return;

    API.get("/api/products/my", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => setMyProducts(res.data))
      .catch((err) => console.error("❌ Error fetching products", err));
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      refreshProducts();
    }
  }, [user?.id, refreshProducts]);
  
  // ADD / UPDATE product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.farmer_price) {
      alert("⚠️ Name & Farmer Price are required!");
      return;
    }

    const formattedProduct = {
      ...product,
      farmer_price: Number(product.farmer_price),
      market_price: Number(product.market_price),
      quantity: Number(product.quantity),
    };

    try {
      if (product.id) {
        // UPDATE product
        await API.put(`/api/products/${product.id}`, formattedProduct, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("✔ Product Updated!");
      } else {
        // ADD NEW product
        await API.post("/api/products/add", formattedProduct, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("🎉 Product Added!");
      }

      setProduct({
        id: null,
        name: "",
        category: "",
        farmer_price: "",
        market_price: "",
        quantity: "",
        image_url: "",
      });

      refreshProducts();
    } catch (err) {
      console.error(err);
      alert("❌ Failed. Try again!");
    }
  };

  // DELETE PRODUCT
  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;

    API.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(() => {
        alert("🗑 Deleted Successfully!");
        refreshProducts();
      })
      .catch((err) => console.error("Delete Error:", err));
  };

  // Load data for Editing
  const editProduct = (item) => {
    setProduct(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={styles.container}>

      {/* Farmer Info */}
      <div style={styles.profileCard}>
        <h2>👨‍🌾 Welcome, {user?.name}</h2>
        <p><strong>Farmer ID:</strong> {user?.id}</p>
        <p><strong>Farm Name:</strong> {user?.farm_name}</p>
        <p><strong>Location:</strong> {user?.location}</p>
      </div>

      <h2 style={{ color: "#1a5d20" }}>
        {product.id ? "✏️ Edit Product" : "➕ Add Product"}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        {["name", "category", "farmer_price", "market_price", "quantity", "image_url"].map((field) => (
          <input
            key={field}
            placeholder={field.replace("_", " ").toUpperCase()}
            value={product[field]}
            onChange={(e) => setProduct({ ...product, [field]: e.target.value })}
            required={field === "name" || field === "farmer_price"}
          />
        ))}

        <button type="submit" style={styles.saveBtn}>
          {product.id ? "Update" : "Add"}
        </button>
      </form>

      {/* My Products */}
      <h3 style={{ marginTop: "30px" }}>📦 My Products</h3>

      {myProducts.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div style={styles.productsList}>
          {myProducts.map((item) => (
            <div key={item.id} style={styles.itemCard}>
              <img
                src={item.image_url || "https://via.placeholder.com/200?text=No+Image"}
                alt={item.name}
                style={styles.productImg}
              />

              <strong>{item.name}</strong> — ₹{item.farmer_price}

              <div style={styles.btnGrp}>
                <button style={styles.editBtn} onClick={() => editProduct(item)}>Edit</button>
                <button style={styles.deleteBtn} onClick={() => deleteProduct(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* CSS STYLES */
const styles = {
  container: { padding: "20px" },
  profileCard: {
    background: "#e3f6e5",
    padding: "15px",
    borderRadius: "8px",
    borderLeft: "5px solid #1b5e20",
    marginBottom: "20px",
  },
  form: {
    display: "grid",
    gap: "10px",
    width: "300px",
    marginBottom: "20px",
  },
  saveBtn: {
    background: "#1b5e20",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  productsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  itemCard: {
    background: "#fff",
    padding: "12px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
  },
  productImg: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  btnGrp: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "8px",
  },
  editBtn: {
    background: "#1b5e20",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#d32f2f",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
};
