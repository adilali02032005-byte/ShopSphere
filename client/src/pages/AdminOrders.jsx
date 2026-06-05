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
    await axios.put(`/orders/${id}`, {
      status,
    });

    fetchOrders();
  };

  return (
    <div>
      <h1>Manage Orders</h1>

      {orders.map((order) => (
        <div key={order._id}>
          <p>Status: {order.status}</p>

          <button onClick={() => updateStatus(order._id, "Processing")}>
            Processing
          </button>

          <button onClick={() => updateStatus(order._id, "Shipped")}>
            Shipped
          </button>

          <button onClick={() => updateStatus(order._id, "Delivered")}>
            Delivered
          </button>
        </div>
      ))}
    </div>
  );
}
