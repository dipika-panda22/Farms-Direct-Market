export default function ProductCard({ item, addToCart }) {
  const savedAmount =
    Number(item.market_price || 0) - Number(item.farmer_price || 0);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        width: "200px"
      }}
    >
      <img
        src={
          item.image_url?.startsWith("http")
            ? item.image_url
            : "https://via.placeholder.com/200?text=No+Image"
        }
        alt={item.name}
        style={{ width: "100%", borderRadius: "6px" }}
      />

      <h4>{item.name}</h4>

      <p>₹{Number(item.farmer_price)}</p>
      <small>Save: ₹{savedAmount > 0 ? savedAmount : 0}</small>

      <br /><br />

      <button
        onClick={() =>
          addToCart({
            product_id: item.id,
            name: item.name,
            image_url: item.image_url,
            farmer_price: Number(item.farmer_price),
            qty: 1
          })
        }
        style={{
          padding: "8px",
          width: "100%",
          backgroundColor: "#2d6a4f",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Add to Cart 🛒
      </button>
    </div>
  );
}
