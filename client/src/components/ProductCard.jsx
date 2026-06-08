export default function ProductCard({ product }) {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      <img
        src={product.images?.[0] || "https://via.placeholder.com/250"}
        alt={product.name}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "contain",
          background: "#fff",
          borderRadius: "8px",
        }}
      />
      <p>₹{product.price}</p>
      <p>{product.category}</p>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "12px",
    borderRadius: "8px",
    minHeight: "140px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "0.2s",
    cursor: "pointer",
  },
};
