import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, totalPrice } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
    pincode: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.address || !formData.mobile || !formData.pincode) {
      alert("Please fill all fields!");
      return;
    }
    alert("Order placed successfully!");
    setShowCheckout(false);
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>🛒 My Cart</h2>

      {cart.length === 0 ? (
        <h3>No items in cart</h3>
      ) : (
        cart.map((item) => (
          <div key={item.product_id} style={styles.card}>
            <img src={item.image_url} alt="" style={styles.img} />
            <div style={styles.content}>
              <h3>{item.name}</h3>
              <p>Price: ₹{item.farmer_price}</p>
              <p>Subtotal: ₹{item.farmer_price * item.qty}</p>

              <div style={styles.qtyControl}>
                <button onClick={() => updateQty(item.product_id, "dec")}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.product_id, "inc")}>+</button>
              </div>
            </div>

            <button
              style={styles.removeBtn}
              onClick={() => removeFromCart(item.product_id)}
            >
              Remove ✖
            </button>
          </div>
        ))
      )}

      {/* Total Section */}
      {cart.length > 0 && (
        <>
          <h2 style={{ marginTop: "20px" }}>Total Price: ₹{totalPrice}</h2>

          <button style={styles.checkoutBtn} onClick={() => setShowCheckout(true)}>
            Proceed to Checkout 🧾
          </button>
        </>
      )}

      {/* Checkout Form Modal */}
      {showCheckout && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Checkout Details</h3>

            <input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={styles.input}
            />
            <textarea
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{ ...styles.input, height: "70px" }}
            />
            <input
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              style={styles.input}
            />
            <input
              placeholder="Pincode"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              style={styles.input}
            />

            <button onClick={handleSubmit} style={styles.placeOrderBtn}>
              Confirm Order ✔
            </button>

            <button onClick={() => setShowCheckout(false)} style={styles.closeBtn}>
              Cancel ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "20px",
    margin: "20px auto",
    width: "90%",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  img: { width: "100px", height: "100px", borderRadius: "10px" },
  content: { textAlign: "center" },
  qtyControl: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
  removeBtn: {
    background: "#b71c1c",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
  },
  checkoutBtn: {
    marginTop: "20px",
    background: "#1b5e20",
    color: "#fff",
    padding: "12px 25px",
    fontSize: "18px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    width: "350px",
    textAlign: "center",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px auto",
    borderRadius: "6px",
    border: "1px solid #aaa",
  },
  placeOrderBtn: {
    background: "#2e7d32",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    marginRight: "10px",
    cursor: "pointer",
    border: "none",
  },
  closeBtn: {
    background: "#b71c1c",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    marginTop: "10px",
  },
};
