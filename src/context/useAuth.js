import { useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";

/**
 * Hook personalizado para acceder al contexto de autenticación
 * @returns {Object} El contexto de autenticación
 */
export const useAuth = () => useContext(AuthContext);
