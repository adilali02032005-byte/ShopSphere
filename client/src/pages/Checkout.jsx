import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Checkout() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const placeOrder = async() => {
    await axios.post("/orders", {
        items: items.map((item)=>({
            productId:item._id,
            name: item._name,
            price: item._price,
            quantity: item._quantity,
        })),
        totalAmount,
    });
    dispatch(clearCart());
    alert("Order placed successfully!");
    navigate("/orders");
  };

  return(
    <div>
        <h1>Checkout</h1>
        <h2>Total: ₹{totalAmount}</h2>
        <button onClick={placeOrder}>
            Place Order
        </button>
    </div>
  );
}
