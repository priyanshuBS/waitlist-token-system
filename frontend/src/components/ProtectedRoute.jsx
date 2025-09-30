import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("user");
  console.log(user);

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return <Outlet />;
};

export default ProtectedRoute;
