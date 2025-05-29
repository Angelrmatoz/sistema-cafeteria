import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.6rem",
          color: "#002040",
        }}
      >
        Cargando...
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirige al login sin guardar la ubicación anterior
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
