import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await axios.get("/analytics");
      setData(res.data);
    };

    fetchAnalytics();
  }, []);

  if (!data) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Analytics Dashboard</h1>

      <h2>Total Orders: {data.totalOrders}</h2>

      <h2>
        Total Revenue: ₹{data.totalRevenue}
      </h2>
    </div>
  );
}