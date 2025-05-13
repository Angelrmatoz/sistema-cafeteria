import React from "react";
import PropTypes from "prop-types";
import "../styles/components/_arrows.scss";

/**
 * Componente de flechas de navegación para las categorías
 * @param {object} props - Propiedades del componente
 * @param {function} props.onPrevious - Función para navegar a la categoría anterior
 * @param {function} props.onNext - Función para navegar a la categoría siguiente
 * @param {boolean} props.disablePrevious - Si debe deshabilitarse la flecha anterior
 * @param {boolean} props.disableNext - Si debe deshabilitarse la flecha siguiente
 * @param {string} props.previousName - Nombre de la categoría anterior (opcional)
 * @param {string} props.nextName - Nombre de la categoría siguiente (opcional)
 * @returns {JSX.Element} - Componente de flechas de navegación
 */
const Arrows = ({
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
  previousName = "",
  nextName = "",
}) => {
  return (
    <div className="navigation-arrows">
      <button
        className={`arrow-btn arrow-prev ${disablePrevious ? "disabled" : ""}`}
        onClick={onPrevious}
        disabled={disablePrevious}
        aria-label={`Ir a categoría ${previousName || "anterior"}`}
        title={previousName ? `Ir a ${previousName}` : "Categoría anterior"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {previousName && <span className="category-name">{previousName}</span>}
      </button>
      <button
        className={`arrow-btn arrow-next ${disableNext ? "disabled" : ""}`}
        onClick={onNext}
        disabled={disableNext}
        aria-label={`Ir a categoría ${nextName || "siguiente"}`}
        title={nextName ? `Ir a ${nextName}` : "Categoría siguiente"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {nextName && <span className="category-name">{nextName}</span>}
      </button>
    </div>
  );
};

Arrows.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  disablePrevious: PropTypes.bool,
  disableNext: PropTypes.bool,
  previousName: PropTypes.string,
  nextName: PropTypes.string,
};

export default Arrows;
