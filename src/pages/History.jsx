import { useState, useEffect } from "react";
import "../layouts/_history.scss";
import sampleTransactions from "../data/transactions";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const History = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    userId: "",
    minAmount: "",
    maxAmount: "",
    status: "all",
  });
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    uniqueCustomers: 0,
    averageTransaction: 0,
  });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  // Cargar datos de transacciones desde el archivo externo
  useEffect(() => {
    setTransactions(sampleTransactions);
    setFilteredTransactions(sampleTransactions);
    calculateStats(sampleTransactions);
  }, []);

  const calculateStats = (transactionData) => {
    const completedTransactions = transactionData.filter(
      (t) => t.status === "completed"
    );
    const totalRevenue = completedTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );
    const uniqueUsers = new Set(completedTransactions.map((t) => t.userId))
      .size;
    const avgTransaction =
      completedTransactions.length > 0
        ? totalRevenue / completedTransactions.length
        : 0;

    setStats({
      totalSales: completedTransactions.length,
      totalRevenue: totalRevenue,
      uniqueCustomers: uniqueUsers,
      averageTransaction: avgTransaction,
    });
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    setIsLoading(true);

    setTimeout(() => {
      let filtered = [...transactions];

      if (filters.startDate) {
        filtered = filtered.filter((t) => t.date >= filters.startDate);
      }

      if (filters.endDate) {
        filtered = filtered.filter((t) => t.date <= filters.endDate);
      }

      if (filters.userId) {
        filtered = filtered.filter((t) =>
          t.userId.toLowerCase().includes(filters.userId.toLowerCase())
        );
      }

      if (filters.minAmount) {
        filtered = filtered.filter(
          (t) => t.amount >= parseFloat(filters.minAmount)
        );
      }

      if (filters.maxAmount) {
        filtered = filtered.filter(
          (t) => t.amount <= parseFloat(filters.maxAmount)
        );
      }

      if (filters.status !== "all") {
        filtered = filtered.filter((t) => t.status === filters.status);
      }

      setFilteredTransactions(filtered);
      calculateStats(filtered);
      setCurrentPage(1);
      setIsLoading(false);
    }, 500);
  };

  const clearFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      userId: "",
      minAmount: "",
      maxAmount: "",
      status: "all",
    });
    setFilteredTransactions(transactions);
    calculateStats(transactions);
    setCurrentPage(1);
  };

  const exportToPDF = () => {
    // Simulación de exportación a PDF
    alert(
      "Exportando a PDF... Esta funcionalidad se implementaría con librerías como jsPDF o React-PDF"
    );
  };

  const exportToExcel = () => {
    // Simulación de exportación a Excel
    alert(
      "Exportando a Excel... Esta funcionalidad se implementaría con librerías como xlsx o SheetJS"
    );
  };

  const viewTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "DOP",
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-DO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("es-DO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Paginación
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const renderStatusBadge = (status) => {
    const statusText = {
      completed: "Completada",
      pending: "Pendiente",
      failed: "Fallida",
    };

    return (
      <span className={`status-badge ${status}`}>
        {statusText[status] || status}
      </span>
    );
  };
  return (
    <main className="history">
      {/* Header */}
      <header className="history__header">
        <div className="history__header-content">
          <h1 className="history__title">Historial de Ventas</h1>{" "}
          <div className="history__buttons">
            <Button
              className="history__button history__button--back"
              variant="danger"
              type="button"
              onClick={() => navigate("/home")}
            >
              Volver
            </Button>
          </div>
        </div>
      </header>{" "}
      {/* Filtros */}
      <section className="history__filters">
        <div className="history__filters-title">Filtros de Búsqueda</div>
        <div className="history__filters-grid">
          <div className="history__filter-group">
            {" "}
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
      {/* Estadísticas */}
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
      </section>{" "}
      {/* Contenido de transacciones */}
      <section className="history__content">
        <div className="history__content-header">
          <h3 className="history__content-title">Transacciones</h3>
          <div className="history__results-count">
            {filteredTransactions.length} resultado
            {filteredTransactions.length !== 1 ? "s" : ""}
          </div>
        </div>{" "}
        {isLoading ? (
          <div className="history__empty-state">
            <div className="history__empty-icon">⏳</div>
            <div className="history__empty-title">Cargando...</div>
            <div className="history__empty-message">
              Por favor espere mientras se procesan los filtros
            </div>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="history__empty-state">
            <div className="history__empty-icon">📋</div>
            <div className="history__empty-title">No hay transacciones</div>
            <div className="history__empty-message">
              No se encontraron transacciones que coincidan con los filtros
              aplicados
            </div>
          </div>
        ) : (
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
                {currentTransactions.map((transaction) => (
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
        )}{" "}
        {/* Paginación */}
        {totalPages > 1 && (
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
                    currentPage === page
                      ? "history__pagination-button--active"
                      : ""
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
        )}
      </section>{" "}
      {/* Modal de detalles de transacción */}
      {showModal && selectedTransaction && (
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
                      <strong>
                        {formatCurrency(selectedTransaction.amount)}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}{" "}
      <div className="history__export-buttons">
        {" "}
        <Button
          variant="danger"
          onClick={exportToPDF}
          disabled={filteredTransactions.length === 0}
          className="history__export-button"
        >
          Reporte de ventas del día en PDF 📊
        </Button>
        <Button
          variant="tertiary"
          onClick={exportToExcel}
          disabled={filteredTransactions.length === 0}
          className="history__export-button"
        >
          Reporte de ventas del día en Excel 📈
        </Button>
      </div>
    </main>
  );
};

export default History;
