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
  });

  const fetchProducts = async () => {
    const res = await axios.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createProduct = async () => {
    await axios.post("/products", formData);

    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "",
    });

    fetchProducts();
  };

  const updateProduct = async () => {
    await axios.put(`/products/${editingId}`, formData);

    setEditingId(null);

    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "",
    });

    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <h2>Add Product</h2>

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />

      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <input
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
      />

      {editingId ? (
        <button onClick={updateProduct}>Update Product</button>
      ) : (
        <button onClick={createProduct}>Create Product</button>
      )}

      <hr />

      <h2>Inventory</h2>

      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>

          <p>₹{product.price}</p>

          <p>Stock: {product.stock}</p>

          <button
            onClick={() => {
              setEditingId(product._id);
              setFormData({
                name: product.name,
                price: product.price,
                description: product.description,
                category: product.category,
                stock: product.stock,
              });
            }}
          >
            Edit
          </button>

          <button onClick={() => deleteProduct(product._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
