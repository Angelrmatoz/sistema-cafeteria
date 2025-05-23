import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Products from "../pages/Products";
import Inventory from "../pages/Inventory";
import History from "../pages/History";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => (
  <Routes>
    {/* Rutas públicas */}
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Rutas protegidas que requieren autenticación */}
    <Route element={<ProtectedRoute />}>
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/history" element={<History />} />   
    </Route>
  </Routes>
);

export default AppRouter;
