import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buttonPrimary = {
    padding: "10px 14px",
    background: "#2874f0",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  };

  if (items.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>Your wishlist is empty 💙</h2>

        <button style={buttonPrimary} onClick={() => navigate("/")}>
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1>Wishlist</h1>

      <div style={styles.list}>
        {items.map((item) => (
          <div key={item._id} style={styles.card}>
            {/* PRODUCT INFO */}
            <div style={styles.details}>
              <h3 style={{ margin: 0 }}>{item.name}</h3>
              <p style={{ margin: "5px 0" }}>₹{item.price}</p>
            </div>

            {/* ACTION BUTTONS */}
            <div style={styles.actions}>
              <button
                style={buttonPrimary}
                onClick={() => {
                  dispatch(addToCart(item));
                  alert("Added to cart");
                }}
              >
                Add to Cart
              </button>

              <button
                style={styles.removeBtn}
                onClick={() => dispatch(removeFromWishlist(item._id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    background: "white",
  },

  details: {
    flex: 2,
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  removeBtn: {
    padding: "10px 14px",
    background: "white",
    color: "red",
    border: "1px solid red",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },

  empty: {
    textAlign: "center",
    marginTop: "80px",
  },
};
