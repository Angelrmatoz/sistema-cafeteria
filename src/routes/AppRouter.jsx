import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Productos from "../pages/Productos";
import Historial from "../pages/Historial";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<Home />} />
    <Route path="/productos" element={<Productos />} />
    <Route path="/historial" element={<Historial />} />
  </Routes>
);

export default AppRouter;