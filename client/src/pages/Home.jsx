import {useEffect, useState} from "react";
import axios from "../api/axios";
import {Link} from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/products");
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || product.category === category)
  );

  return (
    <div>

      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Footwear">Footwear</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
      </select>

      <h1>Products</h1>

      {filteredProducts.map((product) => (
        <Link key={product._id} to={`/product/${product._id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}