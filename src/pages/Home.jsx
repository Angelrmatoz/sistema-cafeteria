import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <main className="background__home">
      <section className="home-container">
        <div className="home-header">
          <img
            className="home-logo"
            src="./src/assets/icons/DGA-icon-svg.svg"
            alt="DGA Logo"
          />
          <h1>Sistema de Cafetería DGA</h1>
        </div>
        <nav className="home-options">
          <div className="option-card" onClick={() => navigate("/products")}>
            <div className="option-icon">🍽️</div>
            <h2>Productos</h2>
            <p>Gestiona los productos y realiza ventas</p>
          </div>
          <div className="option-card" onClick={() => navigate("/inventory")}>
            <div className="option-icon">📦</div>
            <h2>Inventario</h2>
            <p>Consulta el inventario de productos</p>
          </div>
          <div className="option-card" onClick={() => navigate("/history")}>
            <div className="option-icon">📜</div>
            <h2>Historial</h2>
            <p>Consulta el historial de ventas</p>
          </div>
        </nav>
        <footer>
          <Button
            variant="danger"
            size="lg"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="logout-button"
          >
            Cerrar sesión
          </Button>
        </footer>
      </section>
    </main>
  );
};

export default Home;
