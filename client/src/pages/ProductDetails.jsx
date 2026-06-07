import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../features/wishlist/wishlistSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`/products/${id}`);
      setProduct(res.data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <h1>Loading...</h1>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>{product.name}</h1>

        <p style={styles.price}>₹{product.price}</p>

        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>Stock: {product.stock}</p>

        <div style={styles.buttons}>
          <button
            style={styles.btn}
            onClick={() => {
              dispatch(addToCart(product));
              alert("Added to cart");
            }}
          >
            Add to Cart
          </button>

          <button
            style={styles.btnSecondary}
            onClick={() => {
              dispatch(addToWishlist(product));
              alert("Added to wishlist");
            }}
          >
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  price: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2874f0",
  },

  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  btn: {
    background: "#2874f0",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    flex: 1,
  },

  btnSecondary: {
    background: "#ff9f00",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    flex: 1,
  },
};
