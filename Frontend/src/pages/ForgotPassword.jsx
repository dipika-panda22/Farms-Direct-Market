import { useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/api";

export default function ForgotPassword() {
  const query = new URLSearchParams(useLocation().search);
  const role = query.get("role") || "user"; // auto role detect ✔

  const [accountId, setAccountId] = useState("");
  const [mobile, setMobile] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
  
    try {
      const endpoint =
        role === "user"
          ? "/api/auth/reset-password"
          : "/api/auth/reset-password-farmer";
  
      const payload =
        role === "user"
          ? { role, userId: accountId, mobile, newPass }
          : { farmerId: accountId, mobile, newPass };
  
      await API.post(endpoint, payload);
  
      alert("Password Reset Successful! Please Login.");
      window.location.href = "/login";
  
    } catch (err) {
      alert(err.response?.data?.msg || "Reset Failed!");
    }
  };
  
  
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>
          Reset Password {role === "farmer" ? "🌾" : "🔑"}
        </h2>

        <form style={styles.form} onSubmit={handleReset}>
          
          <input
            style={styles.input}
            placeholder={role === "user" ? "Enter User ID" : "Enter Farmer ID"}
            required
            onChange={(e) => setAccountId(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Registered Mobile Number"
            required
            onChange={(e) => setMobile(e.target.value)}
          />

          <input
            type="password"
            style={styles.input}
            placeholder="New Password"
            required
            onChange={(e) => setNewPass(e.target.value)}
          />

          <button style={styles.button}>Reset Password</button>
        </form>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f1fff2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    background: "#fff",
    padding: "25px",
    width: "350px",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.2)"
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #aaa"
  },
  button: {
    background: "#1b5e20",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  }
};
