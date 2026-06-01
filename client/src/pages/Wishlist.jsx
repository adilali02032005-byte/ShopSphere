import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";

export default function Wishlist() {
  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Wishlist</h1>

      {items.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
          <button onClick={() => {dispatch(addToCart(item)); alert("Moved to cart");}}>
            Move to Cart
          </button>
          <button onClick={() => {dispatch(removeFromWishlist(item._id)); alert("Removed from wishlist");}}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
