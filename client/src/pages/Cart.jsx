import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

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
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h2>Your cart is empty 🛒</h2>

        <button style={buttonPrimary} onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1>Cart</h1>

      <h2>Total: ₹{total}</h2>

      <button style={buttonPrimary} onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>

      {/* CART ITEMS */}
      <div style={styles.list}>
        {items.map((item) => (
          <div key={item._id} style={styles.card}>
            <div style={styles.details}>
              <h3 style={{ margin: 0 }}>{item.name}</h3>
              <p style={{ margin: "5px 0" }}>₹{item.price}</p>
            </div>

            {/* QTY CONTROLS */}
            <div style={styles.qtyBox}>
              <button onClick={() => dispatch(decreaseQty(item._id))}>-</button>

              <span style={{ margin: "0 10px" }}>{item.quantity}</span>

              <button onClick={() => dispatch(increaseQty(item._id))}>+</button>
            </div>

            {/* REMOVE */}
            <button
              style={{
                ...buttonPrimary,
                background: "white",
                color: "red",
                border: "1px solid red",
              }}
              onClick={() => dispatch(removeFromCart(item._id))}
            >
              Remove
            </button>
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
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    background: "white",
  },

  details: {
    flex: 2,
  },

  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
};
