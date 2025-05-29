import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Proveedor del contexto de autenticación
 * @param {object} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos
 * @returns {JSX.Element} - Proveedor del contexto
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Al iniciar, verificamos si hay un usuario en localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al parsear usuario:", error);
        localStorage.removeItem("user");
      }
    }
    setIsInitialized(true);
  }, []);

  // Solo manejar redirección desde login después de la inicialización
  useEffect(() => {
    if (isInitialized && user && location.pathname === "/") {
      navigate("/home", { replace: true });
    }
  }, [user, location.pathname, navigate, isInitialized]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    // La redirección se maneja en el useEffect de arriba
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
