import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import { useAuth } from "../context/useAuth";
import { users } from "../data/users.js";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
      login({ username: user.username, role: user.role });
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <main className="img-background">
      <section className="login">
        <header>
          <img
            className="logo-DGA"
            src="./src/assets/icons/DGA-icon-svg.svg"
            alt="DGA Logo"
          />
          <h1 className="login__title">Login</h1>
        </header>

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
          )}{" "}
          <footer className="login__buttons">
            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </Button>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default Login;
