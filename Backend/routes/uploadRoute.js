const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ POST /api/upload-profile
router.post("/", auth, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const userId = req.user.id; // from JWT
  const filePath = `/uploads/${req.file.filename}`;

  const sql = "UPDATE users SET profile_image=? WHERE id=?";
  db.query(sql, [filePath, userId], (err) => {
    if (err) return res.status(500).json({ msg: "DB error", err });

    res.json({
      msg: "Profile image updated!",
      profile_image: filePath,
    });
  });
});

module.exports = router;
