import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: "",
  });

  const fetchProducts = async () => {
    const res = await axios.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "",
      image: "",
    });
    setEditingId(null);
  };

  const createProduct = async () => {
    await axios.post("/products", {
      ...formData,
      images: formData.image ? [formData.image] : [],
    });
    resetForm();
    fetchProducts();
  };

  const updateProduct = async () => {
    await axios.put(`/products/${editingId}`, {
      ...formData,
      images: formData.image ? [formData.image] : [],
    });
    resetForm();
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div style={styles.page}>
      <h1>Admin Panel</h1>

      <div style={styles.layout}>
        {/* FORM */}
        <div style={styles.formBox}>
          <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

          <div style={styles.inputGroup}>
            {["name", "price", "description", "category", "stock", "image"].map(
              (field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={
                    field === "image"
                      ? "IMAGE URL"
                      : field.toUpperCase()
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  style={styles.input}
                />
              ),
            )}
          </div>

          <button
            style={styles.primaryBtn}
            onClick={editingId ? updateProduct : createProduct}
          >
            {editingId ? "Update Product" : "Create Product"}
          </button>
        </div>

        {/* INVENTORY */}
        <div style={styles.listBox}>
          <h2>Inventory</h2>

          {products.length === 0 ? (
            <p style={{ textAlign: "center" }}>No products in inventory</p>
          ) : (
            products.map((product) => (
              <div key={product._id} style={styles.card}>
                <div>
                  <h3 style={{ margin: 0 }}>{product.name}</h3>
                  <p>₹{product.price}</p>
                  <p>Stock: {product.stock}</p>
                </div>

                <div style={styles.actions}>
                  <button
                    style={styles.editBtn}
                    onClick={() => {
                      setEditingId(product._id);
                      setFormData({
                        ...product,
                        image: product.images?.[0] || "",
                      });
                    }}
                  >
                    Edit
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
  },

  layout: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },

  formBox: {
    flex: 1,
    background: "white",
    padding: "15px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    height: "fit-content",
    boxSizing: "border-box",
  },

  listBox: {
    flex: 2,
  },

  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  primaryBtn: {
    width: "100%",
    padding: "10px",
    background: "#2874f0",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "15px",
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    marginBottom: "10px",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  editBtn: {
    padding: "6px 10px",
    background: "#ff9800",
    border: "none",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "6px 10px",
    background: "#e53935",
    border: "none",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};
