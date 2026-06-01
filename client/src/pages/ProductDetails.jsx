import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../api/axios";
import {useDispatch} from "react-redux";
import {addToCart} from "../features/cart/cartSlice";
import {useNavigate} from "react-router-dom";
import {addToWishlist} from "../features/wishlist/wishlistSlice";

export default function ProductDetails() {
  const {id} = useParams();
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
    <div>
      <h1>{product.name}</h1>
      <p>₹{product.price}</p>
      <p>{product.description}</p>
      <p>{product.category}</p>
      <p>Stock: {product.stock}</p>
    <button onClick={() =>{dispatch(addToCart(product)); alert("Added to cart");}}>
        Add to Cart
      </button>
      <button onClick={() => {dispatch(addToWishlist(product)); alert("Added to wishlist");}}>
        Add to Wishlist
      </button>
    </div>
  );
}