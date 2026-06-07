export default function ProductCard({ product }) {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
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
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "0.2s",
    cursor: "pointer",
  },
};

