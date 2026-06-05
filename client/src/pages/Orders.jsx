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
        params: {
          userId: user._id,
        },
      });

      setOrders(res.data);
    };

    fetchOrders();
  }, [user]);

  if (!user) return <h1>Please login</h1>;

  return (
    <div>
      <h1>Orders</h1>

      {orders.map((order) => (
        <div key={order._id}>
          <h3>{order.status}</h3>
          <p>Total: ₹{order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}