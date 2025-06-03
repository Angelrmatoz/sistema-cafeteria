import PropTypes from "prop-types";

const HistoryPagination = ({ currentPage, totalPages, goToPage }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="history__pagination">
      <button
        className="history__pagination-button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Anterior
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`history__pagination-button ${
              currentPage === page ? "history__pagination-button--active" : ""
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        className="history__pagination-button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente →
      </button>

      <div className="history__pagination-info">
        Página {currentPage} de {totalPages}
      </div>
    </div>
  );
};

HistoryPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
};

export default HistoryPagination;
