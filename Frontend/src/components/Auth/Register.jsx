import { useState } from "react";
import API from "../../api/api";

export default function Register() {
  const [userForm, setUserForm] = useState({
    name: "",
    mobile: "",
    password: "",
    role: "user",
  });

  const [farmerForm, setFarmerForm] = useState({
    name: "",
    mobile: "",
    farm_name: "",
    location: "",
    password: "",
    role: "farmer",
  });

  const validateMobile = (mobile) => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const handleUserRegister = async (e) => {
    e.preventDefault();

    if (!validateMobile(userForm.mobile)) {
      return alert("Mobile number must be exactly 10 digits!");
    }

    try {
      await API.post("/api/auth/register", userForm);
      alert("User Registered Successfully!");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.msg || "Registration Failed!");
    }
  };

  const handleFarmerRegister = async (e) => {
    e.preventDefault();

    if (!validateMobile(farmerForm.mobile)) {
      return alert("Mobile number must be exactly 10 digits!");
    }

    try {
      await API.post("/api/auth/register", farmerForm);
      alert("Farmer Registered Successfully!");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.msg || "Registration Failed!");
    }
  };

  return (
    <div style={styles.container}>
      {/* USER REGISTER BOX */}
      <div style={styles.box}>
        <h2 style={styles.title}>User Register</h2>
        <form style={styles.form} onSubmit={handleUserRegister}>
          <input
            style={styles.input}
            placeholder="Full Name"
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Mobile Number"
            onChange={(e) => setUserForm({ ...userForm, mobile: e.target.value })}
          />
          <input
            type="password"
            style={styles.input}
            placeholder="Password"
            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
          />
          <button style={styles.button}>Register</button>
        </form>
      </div>

      {/* FARMER REGISTER BOX */}
      <div style={styles.box}>
        <h2 style={styles.title}>Farmer Register</h2>
        <form style={styles.form} onSubmit={handleFarmerRegister}>
          <input
            style={styles.input}
            placeholder="Full Name"
            onChange={(e) => setFarmerForm({ ...farmerForm, name: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Mobile Number"
            onChange={(e) => setFarmerForm({ ...farmerForm, mobile: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Farm Name"
            onChange={(e) => setFarmerForm({ ...farmerForm, farm_name: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Location"
            onChange={(e) => setFarmerForm({ ...farmerForm, location: e.target.value })}
          />
          <input
            type="password"
            style={styles.input}
            placeholder="Password"
            onChange={(e) => setFarmerForm({ ...farmerForm, password: e.target.value })}
          />
          <button style={styles.button}>Register</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#c6b7b7",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    padding: "20px",
  },
  box: {
    background: "#6d5a51",
    padding: "25px",
    width: "350px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    borderTop: "4px solid #1b5e20",
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: "22px",
    color: "#1b5e20",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#1b5e20",
    padding: "10px",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
