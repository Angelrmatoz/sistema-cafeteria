import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="background__home">
      <div className="home-container">
        <div className="home-header">
          <img
            className="home-logo"
            src="./src/assets/icons/DGA-icon-svg.svg"
            alt="DGA Logo"
          />
          <h1>Sistema de Cafetería DGA</h1>
        </div>

        <div className="home-options">
          <div className="option-card" onClick={() => navigate("/productos")}>
            <div className="option-icon">🍽️</div>
            <h2>Productos</h2>
            <p>Gestiona los productos y realiza ventas</p>
          </div>

          <div className="option-card" onClick={() => navigate("/historial")}>
            <div className="option-icon">📋</div>
            <h2>Historial</h2>
            <p>Consulta el historial de ventas</p>
          </div>
        </div>

        <Button className="logout-button" onClick={() => navigate("/")}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};

export default Home;
