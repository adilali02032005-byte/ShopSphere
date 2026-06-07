import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("/orders/admin");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`/orders/${id}`, { status });
    fetchOrders();
  };

  return (
    <div style={styles.page}>
      <h1>Manage Orders</h1>

      {orders.length === 0 ? (
        <p style={styles.empty}>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={styles.card}>

            {/* HEADER */}
            <div style={styles.header}>
              <div>
                <h3 style={{ margin: 0 }}>Order #{order._id.slice(-6)}</h3>
                <p style={{ margin: 0 }}>
                  User: {order.user?.name || "Unknown"}
                </p>
              </div>

              <span style={styles.status(order.status)}>
                {order.status}
              </span>
            </div>

            {/* ITEMS */}
            <div style={styles.items}>
              {order.items.map((item, index) => (
                <div key={index} style={styles.itemRow}>
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <p style={styles.total}>
              Total: ₹{order.totalAmount}
            </p>

            {/* ACTIONS */}
            <div style={styles.actions}>
              <button
                style={styles.btnBlue}
                onClick={() => updateStatus(order._id, "Processing")}
              >
                Processing
              </button>

              <button
                style={styles.btnOrange}
                onClick={() => updateStatus(order._id, "Shipped")}
              >
                Shipped
              </button>

              <button
                style={styles.btnGreen}
                onClick={() => updateStatus(order._id, "Delivered")}
              >
                Delivered
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
  },

  empty: {
    textAlign: "center",
    marginTop: "50px",
  },

  card: {
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "15px",
    marginBottom: "15px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  status: (status) => ({
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    background:
      status === "Delivered"
        ? "#d4edda"
        : status === "Shipped"
        ? "#fff3cd"
        : "#cce5ff",
    textTransform: "capitalize",
  }),

  items: {
    marginTop: "10px",
    borderTop: "1px solid #eee",
    paddingTop: "10px",
  },

  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "4px 0",
  },

  total: {
    fontWeight: "bold",
    marginTop: "10px",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  btnBlue: {
    padding: "6px 10px",
    background: "#2874f0",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },

  btnOrange: {
    padding: "6px 10px",
    background: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },

  btnGreen: {
    padding: "6px 10px",
    background: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};