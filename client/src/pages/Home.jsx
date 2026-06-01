import {useEffect, useState} from "react";
import axios from "../api/axios";
import {Link} from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/products");
      setProducts(res.data);
      console.log(res.data)//temp
    };

    fetchProducts();
  }, []);

  console.log(products)//temo
  return (
    <div>
      <h1>Products</h1>

      {products.map((product) => (
        <Link key={product._id} to={`/product/${product._id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}