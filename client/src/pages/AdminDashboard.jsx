import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get("/admin/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStats(res.data);
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div style={styles.center}>
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1>Admin Dashboard</h1>

      <div style={styles.grid}>
        <div style={styles.card} onClick={() => navigate("/admin/products")}>
          <h3>Total Products</h3>
          <p style={styles.value}>{stats.totalProducts}</p>
        </div>

        <div style={styles.card} onClick={() => navigate("/admin/orders")}>
          <h3>Total Orders</h3>
          <p style={styles.value}>{stats.totalOrders}</p>
        </div>

        <div style={styles.card} onClick={() => navigate("/admin/users")}>
          <h3>Total Users</h3>
          <p style={styles.value}>{stats.totalUsers}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Revenue</h3>
          <p style={styles.value}>₹{stats.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "20px",
    cursor: "pointer",
    transition: "0.2s ease",
    textAlign: "center",
  },

  value: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#2874f0",
  },

  center: {
    textAlign: "center",
    marginTop: "80px",
  },
};
