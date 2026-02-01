const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// REGISTER (Farmer or User)
router.post("/register", async (req, res) => {
  const { role, mobile, password, name, farm_name, location } = req.body;

  if (!role || !mobile || !password) {
    return res.status(400).json({ msg: "role, mobile, password required" });
  }

  if (!/^[0-9]{10}$/.test(mobile)) {
    return res.status(400).json({ msg: "Mobile must be 10 digits" });
  }

  const hashed = await bcrypt.hash(password, 10);

  db.query("SELECT id FROM users WHERE mobile = ?", [mobile], (err, result) => {
    if (err) return res.status(500).json({ msg: "DB error" });

    if (result.length > 0) {
      return res.status(400).json({ msg: "Mobile already registered" });
    }

    db.query(
      "INSERT INTO users (role, mobile, password, name, farm_name, location) VALUES (?, ?, ?, ?, ?, ?)",
      [role, mobile, hashed, name, farm_name, location],
      (err2) => {
        if (err2) return res.status(500).json({ msg: "DB insert error", err2 });
        res.json({ msg: "Registered successfully!" });
      }
    );
  });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({ msg: "mobile & password required" });
  }

  db.query("SELECT * FROM users WHERE mobile=?", [mobile], async (err, rows) => {
    if (err) return res.status(500).json({ msg: "DB error", err });
    if (rows.length === 0) return res.status(400).json({ msg: "User not found" });

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const payload = {
      id: user.id,
      role: user.role,
      mobile: user.mobile,
      name: user.name,
      farm_name: user.farm_name,
      location: user.location,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({ msg: "Login successful", token, user: payload });
  });
});

// RESET PASSWORD (user + farmer)
router.post("/reset-password", async (req, res) => {
  const { role, mobile, userId, newPass } = req.body;

  if (!mobile || !newPass || !role) {
    return res.status(400).json({ msg: "Missing fields" });
  }

  const hashedPass = await bcrypt.hash(newPass, 10);

  let sql = "UPDATE users SET password=? WHERE mobile=? AND role=?";
  let params = [hashedPass, mobile, role];

  if (role === "user") {
    if (!userId) return res.status(400).json({ msg: "User ID needed" });
    sql += " AND id=?";
    params.push(userId);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ msg: "DB update error", err });
    if (result.affectedRows === 0)
      return res.status(400).json({ msg: "Incorrect details" });

    res.json({ msg: "Password updated successfully!" });
  });
});

// RESET PASSWORD — FARMER ONLY
router.post("/reset-password-farmer", async (req, res) => {
  const { farmerId, mobile, newPass } = req.body;

  if (!mobile || !newPass || !farmerId) {
    return res.status(400).json({ msg: "All fields required" });
  }

  const hashedPass = await bcrypt.hash(newPass, 10);

  db.query(
    "UPDATE users SET password=? WHERE id=? AND mobile=? AND role='farmer'",
    [hashedPass, farmerId, mobile],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "DB update error", err });
      if (result.affectedRows === 0)
        return res.status(400).json({ msg: "Invalid farmer details!" });

      res.json({ msg: "Password reset successfully!" });
    }
  );
});

module.exports = router;
