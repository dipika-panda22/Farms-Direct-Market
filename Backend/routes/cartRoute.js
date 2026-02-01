const express = require("express");
const router = express.Router();
const db = require("../db");

// Get Cart
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;

  const query = `
    SELECT c.product_id, c.qty, p.name, p.image_url, p.farmer_price
    FROM cart_items c
    JOIN products p ON p.id = c.product_id
    WHERE c.user_id = ?
  `;

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.log("DB ERROR FETCHING CART:", err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Add to Cart
router.post("/add", (req, res) => {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id)
    return res.status(400).json({ msg: "Missing data" });

  const checkQuery = `
    SELECT qty FROM cart_items
    WHERE user_id = ? AND product_id = ?
  `;

  db.query(checkQuery, [user_id, product_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.length > 0) {
      // Update quantity
      const updateQuery = `
        UPDATE cart_items SET qty = qty + 1
        WHERE user_id = ? AND product_id = ?
      `;
      db.query(updateQuery, [user_id, product_id]);

      return res.json({ msg: "Quantity updated in cart" });
    }

    // Insert new
    const insertQuery = `
      INSERT INTO cart_items (user_id, product_id, qty)
      VALUES (?, ?, 1)
    `;
    db.query(insertQuery, [user_id, product_id], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({ msg: "Added to cart" });
    });
  });
});

// Remove item
router.delete("/remove/:user_id/:product_id", (req, res) => {
  const { user_id, product_id } = req.params;

  db.query(
    "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
    [user_id, product_id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ msg: "Removed from cart" });
    }
  );
});

// Update qty
router.put("/update-qty", (req, res) => {
  const { user_id, product_id, qty } = req.body;

  db.query(
    "UPDATE cart_items SET qty = ? WHERE user_id = ? AND product_id = ?",
    [qty, user_id, product_id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ msg: "Quantity updated" });
    }
  );
});

module.exports = router;
