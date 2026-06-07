import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/register", formData);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      {/* LEFT BRAND */}
      <div style={styles.left}>
        <h1 style={styles.logo}>ShopSphere</h1>
        <p style={styles.tagline}>Start your shopping journey today</p>
      </div>

      {/* RIGHT FORM */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <button type="submit" style={styles.registerBtn}>
              Register
            </button>

            <button
              type="button"
              style={styles.loginBtn}
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    height: "100vh",
  },

  left: {
    flex: 1,
    background: "#2874f0",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    fontSize: "34px",
    marginBottom: "10px",
  },

  tagline: {
    opacity: 0.9,
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f3f6",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "320px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },

  registerBtn: {
    padding: "10px",
    background: "#2874f0",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  loginBtn: {
    padding: "10px",
    background: "white",
    color: "#2874f0",
    border: "1px solid #2874f0",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};