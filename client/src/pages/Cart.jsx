import {useSelector, useDispatch} from "react-redux";
import {removeFromCart, increaseQty, decreaseQty} from "../features/cart/cartSlice";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <h1>Cart</h1>
      <h2>Total: ₹{total}</h2>
      {items.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
          <p>Qty: {item.quantity}</p>
          <button onClick={() => dispatch(removeFromCart(item._id))}>
            Remove
          </button>
          <button onClick={() => dispatch(decreaseQty(item._id))}>-</button>

          <span>{item.quantity}</span>

          <button onClick={() => dispatch(increaseQty(item._id))}>+</button>
        </div>
      ))}
    </div>
  );
}
