import PropTypes from "prop-types";

const TransactionDetailModal = ({
  showModal,
  selectedTransaction,
  closeModal,
  formatCurrency,
  formatDate,
  formatTime,
  renderStatusBadge,
}) => {
  if (!showModal || !selectedTransaction) {
    return null;
  }

  return (
    <div className="history__transaction-modal" onClick={closeModal}>
      <div
        className="history__transaction-modal__modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="history__transaction-modal__modal-header">
          <h2>Detalles de Transacción</h2>
          <button
            className="history__transaction-modal__close-button"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>

        <div className="history__transaction-modal__transaction-details">
          <div className="history__transaction-modal__detail-item">
            <div className="history__transaction-modal__detail-label">
              ID de Transacción
            </div>
            <div className="history__transaction-modal__detail-value history__transaction-modal__detail-value--transaction-id">
              {selectedTransaction.id}
            </div>
          </div>

          <div className="history__transaction-modal__detail-item">
            <div className="history__transaction-modal__detail-label">
              Usuario
            </div>
            <div className="history__transaction-modal__detail-value">
              {selectedTransaction.userId}
            </div>
          </div>

          <div className="history__transaction-modal__detail-item">
            <div className="history__transaction-modal__detail-label">
              Fecha y Hora
            </div>
            <div className="history__transaction-modal__detail-value">
              {formatDate(selectedTransaction.date)} a las{" "}
              {formatTime(selectedTransaction.time)}
            </div>
          </div>

          <div className="history__transaction-modal__detail-item">
            <div className="history__transaction-modal__detail-label">
              Estado
            </div>
            <div className="history__transaction-modal__detail-value">
              {renderStatusBadge(selectedTransaction.status)}
            </div>
          </div>

          <div className="history__transaction-modal__detail-item">
            <div className="history__transaction-modal__detail-label">
              Total
            </div>
            <div className="history__transaction-modal__detail-value history__transaction-modal__detail-value--amount">
              {formatCurrency(selectedTransaction.amount)}
            </div>
          </div>
        </div>

        <div className="history__transaction-modal__products-detail">
          <div className="history__transaction-modal__products-title">
            Productos Comprados
          </div>
          <table className="history__transaction-modal__products-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unit.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedTransaction.products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td className="history__transaction-modal__detail-value--price">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="history__transaction-modal__detail-value--total">
                    {formatCurrency(product.price * product.quantity)}
                  </td>
                </tr>
              ))}
              <tr className="history__transaction-modal__total-row">
                <td colSpan="3">
                  <strong>TOTAL</strong>
                </td>
                <td className="history__transaction-modal__detail-value--total">
                  <strong>{formatCurrency(selectedTransaction.amount)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

TransactionDetailModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  selectedTransaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  }),
  closeModal: PropTypes.func.isRequired,
  formatCurrency: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  formatTime: PropTypes.func.isRequired,
  renderStatusBadge: PropTypes.func.isRequired,
};

export default TransactionDetailModal;
