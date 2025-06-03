import PropTypes from "prop-types";

const HistoryStats = ({ stats, formatCurrency }) => {
  return (
    <section className="history__stats">
      <div className="history__stat-card">
        <div className="history__stat-value history__stat-value--sales">
          {stats.totalSales}
        </div>
        <div className="history__stat-label">Ventas Totales</div>
      </div>

      <div className="history__stat-card">
        <div className="history__stat-value history__stat-value--revenue">
          {formatCurrency(stats.totalRevenue)}
        </div>
        <div className="history__stat-label">Ingresos Totales</div>
      </div>

      <div className="history__stat-card">
        <div className="history__stat-value history__stat-value--customers">
          {stats.uniqueCustomers}
        </div>
        <div className="history__stat-label">Clientes Únicos</div>
      </div>

      <div className="history__stat-card">
        <div className="history__stat-value history__stat-value--average">
          {formatCurrency(stats.averageTransaction)}
        </div>
        <div className="history__stat-label">Promedio por Venta</div>
      </div>
    </section>
  );
};

HistoryStats.propTypes = {
  stats: PropTypes.shape({
    totalSales: PropTypes.number.isRequired,
    totalRevenue: PropTypes.number.isRequired,
    uniqueCustomers: PropTypes.number.isRequired,
    averageTransaction: PropTypes.number.isRequired,
  }).isRequired,
  formatCurrency: PropTypes.func.isRequired,
};

export default HistoryStats;
