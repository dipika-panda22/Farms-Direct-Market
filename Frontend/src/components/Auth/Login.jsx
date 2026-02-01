import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api/api";

export default function Login() {
  const [role, setRole] = useState("user");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!mobile || !password) {
      alert("Please enter mobile number and password!");
      return;
    }

    try {
      const res = await API.post("/api/auth/login", {
        mobile,
        password,
        role,
      });

      login(res.data.user, res.data.token);

      navigate(
        res.data.user.role === "farmer"
          ? "/farmer-dashboard"
          : "/user-dashboard"
      );
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid Credentials!");
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Content */}
      <div style={styles.left}>
        <h1 style={styles.title}>🌱 Farms Direct</h1>
        <h2 style={styles.subTitle}>Fresh Product Registry</h2>
        <p style={styles.info}>
          Buy fresh product directly from trusted local farmers.
        </p>
        <p style={styles.help}>📞 Help Desk: 7978383640</p>
      </div>

      {/* Login Card */}
      <div style={styles.card}>
        <div style={styles.roleContainer}>
          <button
            style={role === "user" ? styles.activeRole : styles.role}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            style={role === "farmer" ? styles.activeRole : styles.role}
            onClick={() => setRole("farmer")}
          >
            Farmer
          </button>
        </div>

        <h3 style={styles.loginTitle}>
          Login as {role === "user" ? "User" : "Farmer"}
        </h3>

        <input
          type="text"
          style={styles.input}
          placeholder="Mobile Number"
          maxLength="10"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          type="password"
          style={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p style={styles.forgot} onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </p>

        <button style={styles.loginBtn} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.register}>
          New here?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "60px",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://media.istockphoto.com/id/1720167082/photo/two-farmers-in-a-field-examining-soy-crop.webp?b=1&s=612x612&w=0&k=20&c=dBeTpXlUH_V5IFrj3_vFgs9JE3wYrdq9BsPpYKsv7ZI=')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Segoe UI, sans-serif",
  },

  left: {
    maxWidth: "520px",
    color: "#fff",
  },

  title: {
    fontSize: "46px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  subTitle: {
    fontSize: "26px",
    fontWeight: "500",
  },

  info: {
    marginTop: "20px",
    fontSize: "18px",
    lineHeight: "1.6",
  },

  help: {
    marginTop: "15px",
    fontSize: "14px",
    opacity: 0.85,
  },

  card: {
    width: "400px",
    background: "rgba(255,255,255,0.95)",
    padding: "35px",
    borderRadius: "16px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.3)",
  },

  roleContainer: {
    display: "flex",
    background: "#e8f5e9",
    padding: "5px",
    borderRadius: "8px",
    marginBottom: "25px",
  },

  role: {
    flex: 1,
    padding: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
  },

  activeRole: {
    flex: 1,
    padding: "10px",
    border: "none",
    background: "#2e7d32",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },

  loginTitle: {
    textAlign: "center",
    color: "#2e7d32",
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  forgot: {
    fontSize: "13px",
    color: "#2e7d32",
    cursor: "pointer",
    textAlign: "right",
    marginTop: "5px",
  },

  loginBtn: {
    width: "100%",
    padding: "13px",
    marginTop: "20px",
    fontSize: "15px",
    fontWeight: "600",
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  register: {
    marginTop: "18px",
    fontSize: "14px",
    textAlign: "center",
  },

  link: {
    color: "#2e7d32",
    fontWeight: "600",
    cursor: "pointer",
  },
};
