import PropTypes from "prop-types";

const TransactionTable = ({
  transactions,
  isLoading,
  formatCurrency,
  formatDate,
  formatTime,
  renderStatusBadge,
  viewTransactionDetails,
}) => {
  if (isLoading) {
    return (
      <div className="history__empty-state">
        <div className="history__empty-icon">⏳</div>
        <div className="history__empty-title">Cargando...</div>
        <div className="history__empty-message">
          Por favor espere mientras se procesan los filtros
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="history__empty-state">
        <div className="history__empty-icon">📋</div>
        <div className="history__empty-title">No hay transacciones</div>
        <div className="history__empty-message">
          No se encontraron transacciones que coincidan con los filtros
          aplicados
        </div>
      </div>
    );
  }

  return (
    <div className="history__table-container">
      <table className="history__table">
        <thead className="history__table-head">
          <tr>
            <th className="history__table-header">ID Transacción</th>
            <th className="history__table-header">Usuario</th>
            <th className="history__table-header">Fecha</th>
            <th className="history__table-header">Hora</th>
            <th className="history__table-header">Productos</th>
            <th className="history__table-header">Monto</th>
            <th className="history__table-header">Estado</th>
            <th className="history__table-header">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr className="history__table-row" key={transaction.id}>
              <td className="history__table-cell history__table-cell--id">
                {transaction.id}
              </td>
              <td className="history__table-cell history__table-cell--user">
                {transaction.userId}
              </td>
              <td className="history__table-cell history__table-cell--date">
                {formatDate(transaction.date)}
              </td>
              <td className="history__table-cell">
                {formatTime(transaction.time)}
              </td>
              <td className="history__table-cell">
                <div className="history__products-list">
                  {transaction.products.map((product, index) => (
                    <span key={index} className="history__product-item">
                      {product.quantity}x {product.name}
                    </span>
                  ))}
                </div>
              </td>
              <td className="history__table-cell history__table-cell--amount">
                {formatCurrency(transaction.amount)}
              </td>
              <td className="history__table-cell history__table-cell--status">
                {renderStatusBadge(transaction.status)}
              </td>
              <td className="history__table-cell history__table-cell--actions">
                <button
                  className="history__view-button"
                  onClick={() => viewTransactionDetails(transaction)}
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
        })
      ).isRequired,
      amount: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  formatCurrency: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  formatTime: PropTypes.func.isRequired,
  renderStatusBadge: PropTypes.func.isRequired,
  viewTransactionDetails: PropTypes.func.isRequired,
};

export default TransactionTable;
