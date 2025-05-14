import "../styles/components/_buttons.scss";
import PropTypes from "prop-types";

/**
 * Componente Button personalizado
 * @param {Object} props - Propiedades del componente
 * @param {ReactNode} props.children - Contenido del botón
 * @param {Function} props.onClick - Función a ejecutar al hacer clic
 * @param {"button"|"submit"|"reset"} props.type - Tipo de botón HTML
 * @param {"primary"|"secondary"|"tertiary"|"outline"|"ghost"|"danger"} props.variant - Variante de estilo del botón
 * @param {"sm"|"md"|"lg"} props.size - Tamaño del botón
 * @param {boolean} props.isLoading - Indica si el botón está en estado de carga
 * @param {boolean} props.disabled - Indica si el botón está deshabilitado
 * @param {boolean} props.isIcon - Indica si el botón contiene un icono (para espaciado)
 * @param {boolean} props.isCircle - Indica si el botón es circular (solo para iconos)
 * @param {string} props.className - Clases adicionales
 */
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  isIcon = false,
  isCircle = false,
  className = "",
}) => {
  // Construir las clases del botón
  const buttonClasses = [
    `btn-${variant}`,
    size !== "md" ? `btn-${size}` : "",
    isLoading ? "btn-loading" : "",
    isIcon ? "btn-icon" : "",
    isCircle ? "btn-circle" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "outline",
    "ghost",
    "danger",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  isIcon: PropTypes.bool,
  isCircle: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
