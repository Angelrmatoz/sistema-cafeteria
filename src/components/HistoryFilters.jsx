import PropTypes from "prop-types";

const HistoryFilters = ({
  filters,
  handleFilterChange,
  applyFilters,
  clearFilters,
}) => {
  return (
    <section className="history__filters">
      <div className="history__filters-title">Filtros de Búsqueda</div>
      <div className="history__filters-grid">
        <div className="history__filter-group">
          <label className="history__filter-label" htmlFor="startDate">
            Fecha Inicio
          </label>
          <input
            className="history__filter-input"
            type="date"
            id="startDate"
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
          />
        </div>

        <div className="history__filter-group">
          <label className="history__filter-label" htmlFor="endDate">
            Fecha Fin
          </label>
          <input
            className="history__filter-input"
            type="date"
            id="endDate"
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
          />
        </div>

        <div className="history__filter-group">
          <label className="history__filter-label" htmlFor="userId">
            ID de Usuario
          </label>
          <input
            className="history__filter-input"
            type="text"
            id="userId"
            placeholder="Buscar por usuario..."
            value={filters.userId}
            onChange={(e) => handleFilterChange("userId", e.target.value)}
          />
        </div>

        <div className="history__filter-group">
          <label className="history__filter-label" htmlFor="minAmount">
            Monto Mínimo
          </label>
          <input
            className="history__filter-input"
            type="number"
            id="minAmount"
            placeholder="0.00"
            step="0.01"
            value={filters.minAmount}
            onChange={(e) => handleFilterChange("minAmount", e.target.value)}
          />
        </div>

        <div className="history__filter-group">
          <label className="history__filter-label" htmlFor="maxAmount">
            Monto Máximo
          </label>
          <input
            className="history__filter-input"
            type="number"
            id="maxAmount"
            placeholder="999.99"
            step="0.01"
            value={filters.maxAmount}
            onChange={(e) => handleFilterChange("maxAmount", e.target.value)}
          />
        </div>

        <div className="history__filter-group">
          <label className="history__filter-label" htmlFor="status">
            Estado
          </label>
          <select
            className="history__filter-select"
            id="status"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="completed">Completada</option>
            <option value="pending">Pendiente</option>
            <option value="failed">Fallida</option>
          </select>
        </div>

        <div className="history__filter-actions">
          <button
            className="history__filter-button history__filter-button--apply"
            onClick={applyFilters}
          >
            🔍 Aplicar
          </button>
          <button
            className="history__filter-button history__filter-button--clear"
            onClick={clearFilters}
          >
            🗑️ Limpiar
          </button>
        </div>
      </div>
    </section>
  );
};

HistoryFilters.propTypes = {
  filters: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    minAmount: PropTypes.string.isRequired,
    maxAmount: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default HistoryFilters;
