import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Checkout() {
  const user = useSelector((state) => state.auth.user);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const placeOrder = async () => {
    try {
      const orderRes = await axios.post("/payments/create-order", {
        amount: totalAmount,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        name: "ShopSphere",
        description: "Order Payment",
        order_id: orderRes.data.id,

        handler: async function () {
          await axios.post("/orders", {
            user: user._id,
            items: items.map((item) => ({
              productId: item._id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
            totalAmount,
          });

          dispatch(clearCart());
          navigate("/orders");
        },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div style={styles.center}>
        <h2>Please login first</h2>
        <button style={styles.button} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={styles.center}>
        <h2>Your cart is empty 🛒</h2>
        <button style={styles.button} onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1>Checkout</h1>

      <div style={styles.layout}>
        {/* LEFT: ITEMS */}
        <div style={styles.itemsBox}>
          <h2>Order Summary</h2>

          {items.map((item) => (
            <div key={item._id} style={styles.itemRow}>
              <div style={styles.itemInfo}>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p style={{ margin: "5px 0" }}>Price: ₹{item.price}</p>
              </div>

              <div style={styles.qty}>Qty: {item.quantity}</div>

              <div style={styles.itemTotal}>₹{item.price * item.quantity}</div>
            </div>
          ))}
        </div>

        {/* RIGHT: SUMMARY */}
        <div style={styles.summaryBox}>
          <h2>Price Details</h2>

          <p>Items: {items.length}</p>
          <p>Subtotal: ₹{totalAmount}</p>
          <hr />

          <h3>Total: ₹{totalAmount}</h3>

          <button style={styles.payBtn} onClick={placeOrder}>
            Pay & Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
  },

  layout: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  },

  itemsBox: {
    flex: 2,
    background: "white",
    padding: "15px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },

  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
    alignItems: "center",
  },

  itemInfo: {
    flex: 2,
  },

  qty: {
    flex: 1,
    textAlign: "center",
  },

  itemTotal: {
    flex: 1,
    textAlign: "right",
    fontWeight: "bold",
  },

  summaryBox: {
    flex: 1,
    background: "white",
    padding: "15px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    position: "sticky",
    top: "20px",
  },

  payBtn: {
    width: "100%",
    padding: "12px",
    background: "#2874f0",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
  },

  button: {
    padding: "10px 14px",
    background: "#2874f0",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },

  center: {
    textAlign: "center",
    marginTop: "80px",
  },
};
