import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaHeart, FaBox, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAdmin = user?.role === "admin";
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const categories = ["All", "Footwear", "Electronics", "Accessories"];

  const handleSelect = (cat) => {
    setOpen(false);
    navigate(cat === "All" ? "/" : `/?category=${cat}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={styles.nav}>
      {/* LOGO */}
      <Link to="/" style={styles.logo}>
        ShopSphere
      </Link>

      {/* SEARCH */}
      {!isAdmin && isHome && (
        <input
          style={styles.search}
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/?search=${search}`);
            }
          }}
        />
      )}

      {/* CATEGORY */}
      {!isAdmin && isHome && (
        <div style={styles.dropdown} ref={dropdownRef}>
          <button style={styles.dropBtn} onClick={() => setOpen(!open)}>
            Categories ▾
          </button>

          {open && (
            <div style={styles.menu}>
              {categories.map((cat) => (
                <div
                  key={cat}
                  style={styles.menuItem}
                  onClick={() => handleSelect(cat)}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ACTIONS */}
      <div style={styles.icons}>
        {user && user.role !== "admin" && (
          <Link to="/wishlist" style={styles.item}>
            <FaHeart />
            <span>Wishlist</span>
          </Link>
        )}

        {user && user.role !== "admin" && (
          <Link to="/cart" style={styles.item}>
            <FaShoppingCart />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span style={styles.badge}>{cartItems.length}</span>
            )}
          </Link>
        )}

        {user && user.role !== "admin" && (
          <Link to="/orders" style={styles.item}>
            <FaBox />
            <span>Orders</span>
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin" style={styles.item}>
            Admin
          </Link>
        )}

        {user && (
          <button onClick={handleLogout} style={styles.itemBtn}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#2874f0",
    padding: "10px 20px",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "18px",
  },

  search: {
    width: "100%",
    maxWidth: "500px",
    padding: "8px",
    borderRadius: "4px",
    border: "none",
    outline: "none",
  },

  dropdown: {
    position: "relative",
    zIndex: 1001,
  },

  dropBtn: {
    background: "white",
    color: "#2874f0",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },

  menu: {
    position: "absolute",
    top: "38px",
    left: 0,
    background: "white",
    color: "black",
    borderRadius: "4px",
    width: "160px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },

  menuItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },

  icons: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  item: {
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    position: "relative",
  },

  itemBtn: {
    color: "white",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
  },

  badge: {
    background: "red",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "10px",
    marginLeft: "4px",
  },
};
