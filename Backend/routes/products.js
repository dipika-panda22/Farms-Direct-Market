const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// ADD PRODUCT (Farmer Only)
router.post("/add", auth, role("farmer"), (req, res) => {
  const { name, category, farmer_price, market_price, quantity, image_url } = req.body;

  if (!name || !farmer_price) {
    return res.status(400).json({ msg: "Name & farmer price required!" });
  }

  const sqlFind = `
    SELECT image_url 
    FROM products 
    WHERE LOWER(name)=LOWER(?) 
    ORDER BY id DESC LIMIT 1
  `;

  db.query(sqlFind, [name], (err, result) => {
    if (err) return res.status(500).json({ msg: "DB error", err });

    let finalImg =
      result.length > 0 && result[0].image_url
        ? result[0].image_url
        : image_url || "https://via.placeholder.com/200?text=No+Image";

    const sqlInsert = `
      INSERT INTO products 
      (farmer_id, name, category, farmer_price, market_price, quantity, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sqlInsert,
      [req.user.id, name, category, farmer_price, market_price, quantity, finalImg],
      (err2, result2) => {
        if (err2) return res.status(500).json({ msg: "DB insert error", err2 });

        res.json({ msg: "Product added!", product_id: result2.insertId });
      }
    );
  });
});

// GET ONLY LOGGED-IN FARMER'S PRODUCTS
router.get("/my", auth, role("farmer"), (req, res) => {
  const sql = `
    SELECT id, name, category, farmer_price, market_price, quantity, image_url
    FROM products
    WHERE farmer_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ msg: "DB error", err });
    res.json(rows);
  });
});


// GET ONLY LOGGED-IN FARMER'S PRODUCTS
// PUBLIC: Get all products for homepage or products page
router.get("/", (req, res) => {
  const sql = `
    SELECT id, name, image_url 
    FROM products
    ORDER BY id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ msg: "DB error", err });
    res.json(results);
  });
});


// 🟢 FIXED: CUSTOMER DASHBOARD — Unique product list
router.get("/customer", (req, res) => {
  const sql = `
    SELECT 
      MIN(id) AS id,
      name,
      ANY_VALUE(image_url) AS image_url,
      MIN(farmer_price) AS price
    FROM products
    GROUP BY name
    ORDER BY name ASC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ msg: "DB error", err });
    res.json(results);
  });
});

// PRODUCT OFFERS PAGE — all farmers selling this product
router.get("/offers/:name", (req, res) => {
  const sql = `
    SELECT 
      p.id,
      p.name,
      p.farmer_price,
      p.market_price,
      p.quantity,
      p.image_url,
      u.id AS farmer_id,
      u.farm_name,
      u.location
    FROM products p
    JOIN users u ON p.farmer_id = u.id
    WHERE LOWER(p.name) = LOWER(?)
    ORDER BY p.farmer_price ASC
  `;

  db.query(sql, [req.params.name], (err, results) => {
    if (err) return res.status(500).json({ msg: "DB error", err });
    res.json(results);
  });
});

// UPDATE PRODUCT (Farmer Only)
router.put("/:id", auth, role("farmer"), (req, res) => {
  const { name, category, farmer_price, market_price, quantity, image_url } = req.body;

  const sql = `
    UPDATE products SET
    name=?, category=?, farmer_price=?, market_price=?, quantity=?, image_url=?
    WHERE id=? AND farmer_id=?
  `;

  db.query(sql, [name, category, farmer_price, market_price, quantity, image_url, req.params.id, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "DB update error", err });
      if (result.affectedRows === 0)
        return res.status(403).json({ msg: "Unauthorized – not your product" });
      res.json({ msg: "Product updated!" });
    }
  );
});

// DELETE PRODUCT (Farmer Only)
router.delete("/:id", auth, role("farmer"), (req, res) => {
  db.query("DELETE FROM products WHERE id=? AND farmer_id=?", [req.params.id, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "DB delete error", err });
      if (result.affectedRows === 0)
        return res.status(403).json({ msg: "Unauthorized – not your product" });
      res.json({ msg: "Product deleted!" });
    }
  );
});

module.exports = router;
