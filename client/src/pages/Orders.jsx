import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../api/axios";

export default function Orders() {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const res = await axios.get("/orders", {
        params: { userId: user._id },
      });

      setOrders(res.data);
    };

    fetchOrders();
  }, [user]);

  if (!user) return <h1>Please login</h1>;

  if (orders.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>No orders yet 🛍️</h2>
        <p>Start shopping to see your orders here</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1>My Orders</h1>

      <div style={styles.list}>
        {orders.map((order) => (
          <div key={order._id} style={styles.card}>

            {/* HEADER */}
            <div style={styles.header}>
              <span style={styles.status(order.status)}>
                {order.status}
              </span>

              <span style={styles.total}>
                ₹{order.totalAmount}
              </span>
            </div>

            {/* ITEMS */}
            <div style={styles.items}>
              {order.items?.map((item, index) => (
                <div key={index} style={styles.item}>
                  <div>
                    <strong>{item.name}</strong>
                    <p style={{ margin: 0 }}>Qty: {item.quantity}</p>
                  </div>

                  <div>₹{item.price}</div>
                </div>
              ))}
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
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "15px",
    background: "white",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  status: (status) => ({
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    background:
      status === "delivered"
        ? "#d4edda"
        : status === "shipped"
        ? "#fff3cd"
        : "#cce5ff",
    color: "#333",
    textTransform: "capitalize",
  }),

  total: {
    fontWeight: "bold",
  },

  items: {
    borderTop: "1px solid #eee",
    paddingTop: "10px",
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },

  empty: {
    textAlign: "center",
    marginTop: "80px",
  },
};