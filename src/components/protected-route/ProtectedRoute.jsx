import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { authUser } = useContext(AuthContext);
  if (!authUser) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
