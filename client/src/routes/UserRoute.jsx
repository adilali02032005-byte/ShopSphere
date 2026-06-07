import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function UserRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" />;

  if (user.role === "admin") {
    return <Navigate to="/admin" />;
  }

  return children;
}