import { useState } from "react";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const res = await axios.post("/auth/login", formData);

      dispatch(setLogin(res.data));

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      {/* LEFT BRAND */}
      <div style={styles.left}>
        <h1 style={styles.logoSpace}>ShopSphere</h1>
        <p style={styles.tagline}>Your one-stop shopping destination</p>
      </div>

      {/* RIGHT FORM */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2>Login</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />

            <button type="submit" style={styles.loginBtn}>
              Login
            </button>

            <button
              type="button"
              style={styles.registerBtn}
              onClick={() => navigate("/register")}
            >
              Create New Account
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

  logoSpace: {
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

  loginBtn: {
    padding: "10px",
    background: "#2874f0",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "bold",
  },

  registerBtn: {
    padding: "10px",
    background: "white",
    color: "#2874f0",
    border: "1px solid #2874f0",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "bold",
  },
};