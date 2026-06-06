import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Checkout() {
  const user = useSelector((state) => state.auth.user);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const placeOrder = async () => {
    try {
      await axios.post("/orders", {
        user: user._id,
        items: items.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount,
      });

      dispatch(clearCart());

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to place order");
    }
  };

  if (!user) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Total: ₹{totalAmount}</h2>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
