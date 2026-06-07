import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [setSearch] = useState("");
  const [setCategory] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category") || "";
  const search = query.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/products");
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(search.toLowerCase()) &&
      (!category || product.category === category),
  );

  return (
    <div>
      <h1 style={{ padding: "10px" }}>Products</h1>

      <div style={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              onMouseEnter={() => setHoveredId(product._id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                transform:
                  hoveredId === product._id ? "scale(1.03)" : "scale(1)",
                transition: "0.2s ease",
                boxShadow:
                  hoveredId === product._id
                    ? "0 4px 15px rgba(0,0,0,0.2)"
                    : "none",
                borderRadius: "8px",
              }}
            >
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProductCard product={product} />
              </Link>
            </div>
          ))
        ) : (
          <p style={{ padding: "10px" }}>No products found</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    padding: "10px",
  },
};
