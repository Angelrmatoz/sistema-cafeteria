import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirige al login sin guardar la ubicación anterior
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
