import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Register = () => {
  const navigate = useNavigate();

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

        <h1 className="login__title">Registro</h1>

        <form className="login__form" action="/home" method="POST">
          <div>
            <label className="label label__username" htmlFor="username">
              Usuario
            </label>
            <input
              className="input__username"
              type="text"
              id="username"
              name="username"
              required
            />
          </div>

          <div>
            <label className="label label__email" htmlFor="email">
              Correo electrónico
            </label>
            <input
              className="input__email"
              type="email"
              id="email"
              name="email"
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
              required
            />
          </div>

          <div>
            <label className="label label__password" htmlFor="confirm-password">
              Confirmar contraseña
            </label>
            <input
              className="input__password"
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
          </div>

          <div className="login__buttons">
            <Button
              variant="primary"
              type="submit"
            >
              Registrarse
            </Button>
            <Button
              variant="tertiary"
              type="button"
              onClick={() => navigate("/")}
            >
              Volver
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
