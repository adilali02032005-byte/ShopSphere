import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useSelector } from "react-redux";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const fetchUsers = async () => {
    const res = await axios.get("/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(res.data);
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div style={styles.page}>
      <h1>Users</h1>

      {users.length === 0 ? (
        <p style={styles.empty}>No users found</p>
      ) : (
        users.map((user) => (
          <div key={user._id} style={styles.card}>

            <div>
              <h3 style={{ margin: 0 }}>{user.name}</h3>
              <p style={{ margin: "4px 0" }}>{user.email}</p>

              <span style={styles.role(user.role)}>
                {user.role}
              </span>
            </div>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteUser(user._id)}
            >
              Delete
            </button>

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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "12px",
    marginBottom: "10px",
  },

  role: (role) => ({
    padding: "3px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    background: role === "admin" ? "#ff9800" : "#cce5ff",
    color: "#333",
    textTransform: "capitalize",
  }),

  deleteBtn: {
    padding: "6px 10px",
    background: "#e53935",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};