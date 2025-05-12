import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";

const users = [
  { username: "Admin", password: "1234", role: "admin" },
  { username: "cajero", password: "1234", role: "cajero" },
];

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setError("");
      // Aquí podrías guardar el rol en localStorage o contexto si lo necesitas
      navigate("/home");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="img-background">
      <div className="login">
        <div>
          <img
            className="logo-DGA"
            src="./src/assets/icons/DGA-icon-svg.svg"
            alt="DGA Logo"
          />
        </div>

        <h1 className="login__title">Login</h1>

        <form className="login__form" onSubmit={handleSubmit}>
          <div>
            <label className="label label__username" htmlFor="username">
              Usuario
            </label>
            <input
              className="input__username"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label label__password" htmlFor="password">
              Contraseña
            </label>
            <input
              className="input__password"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
          )}

          <div className="login__buttons">
            <Button
              className="login__button login__button--primary"
              type="submit"
            >
              Iniciar sesion
            </Button>
            <Button
              className="login__button login__button--secondary"
              type="button"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;