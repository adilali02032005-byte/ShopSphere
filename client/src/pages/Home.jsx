import {useEffect, useState} from "react";
import axios from "../api/axios";
import {Link} from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/products");
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {products.map((product) => (
        <Link to={`/product/${product._id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}