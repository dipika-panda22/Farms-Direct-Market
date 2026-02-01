/// src/components/Layout/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const homeLink = user?.role === "user" ? "/user-dashboard" : "/";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to={homeLink} style={styles.logo}>
        Farms Direct
      </Link>

      <div style={styles.links}>
        {/* ✅ NOT LOGGED IN */}
        {!user && (
          <>
            <Link style={styles.link} to="/">Home</Link>
            <Link style={styles.link} to="/products">Products</Link>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
          </>
        )}

        {/* ✅ FARMER */}
        {user?.role === "farmer" && (
          <Link style={styles.link} to="/farmer-dashboard">
            Dashboard
          </Link>
        )}

        {/* ✅ USER (NO PRODUCTS LINK) */}
        {user?.role === "user" && (
          <>
            <Link style={styles.link} to="/user-dashboard">Home</Link>
            <Link style={styles.link} to="/my-account">My Account</Link>
            <Link style={styles.link} to="/cart">
              Cart 🛒 ({cart?.length || 0})
            </Link>
          </>
        )}

        {user && (
          <button style={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}


const styles = {
  nav: {
    background: "#1b5e20",
    padding: "12px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "22px",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
  },
  logout: {
    background: "#c62828",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
  },
};
