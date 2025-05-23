import React, { useState, useEffect } from "react";
import "../layouts/_history.scss";

const History = () => {
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

  // Simulación de datos de transacciones
  useEffect(() => {
    const sampleTransactions = [
      {
        id: "TXN-001",
        userId: "USR-12345",
        date: "2024-01-15",
        time: "14:30:00",
        amount: 45.5,
        status: "completed",
        products: [
          { name: "Café Americano", quantity: 2, price: 15.0 },
          { name: "Sandwich Club", quantity: 1, price: 15.5 },
        ],
      },
      {
        id: "TXN-002",
        userId: "USR-67890",
        date: "2024-01-15",
        time: "15:45:00",
        amount: 28.0,
        status: "completed",
        products: [
          { name: "Café Latte", quantity: 1, price: 18.0 },
          { name: "Brownie", quantity: 1, price: 10.0 },
        ],
      },
      {
        id: "TXN-003",
        userId: "USR-11111",
        date: "2024-01-14",
        time: "09:15:00",
        amount: 22.5,
        status: "completed",
        products: [
          { name: "Café Americano", quantity: 1, price: 15.0 },
          { name: "Croissant", quantity: 1, price: 7.5 },
        ],
      },
      {
        id: "TXN-004",
        userId: "USR-22222",
        date: "2024-01-14",
        time: "11:20:00",
        amount: 0.0,
        status: "failed",
        products: [{ name: "Café Cappuccino", quantity: 1, price: 20.0 }],
      },
      {
        id: "TXN-005",
        userId: "USR-12345",
        date: "2024-01-13",
        time: "16:10:00",
        amount: 35.0,
        status: "completed",
        products: [
          { name: "Café Mocha", quantity: 1, price: 22.0 },
          { name: "Muffin", quantity: 1, price: 13.0 },
        ],
      },
    ];

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
    <div className="history-container">
      {/* Header */}
      <div className="history-header">
        <div className="header-content">
          <h1>Historial de Ventas</h1>
          <div className="export-buttons">
            <button
              className="export-pdf"
              onClick={exportToPDF}
              disabled={filteredTransactions.length === 0}
            >
              📄 Exportar PDF
            </button>
            <button
              className="export-excel"
              onClick={exportToExcel}
              disabled={filteredTransactions.length === 0}
            >
              📊 Exportar Excel
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="history-filters">
        <div className="filters-title">Filtros de Búsqueda</div>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="startDate">Fecha Inicio</label>
            <input
              type="date"
              id="startDate"
              value={filters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="endDate">Fecha Fin</label>
            <input
              type="date"
              id="endDate"
              value={filters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="userId">ID de Usuario</label>
            <input
              type="text"
              id="userId"
              placeholder="Buscar por usuario..."
              value={filters.userId}
              onChange={(e) => handleFilterChange("userId", e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="minAmount">Monto Mínimo</label>
            <input
              type="number"
              id="minAmount"
              placeholder="0.00"
              step="0.01"
              value={filters.minAmount}
              onChange={(e) => handleFilterChange("minAmount", e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="maxAmount">Monto Máximo</label>
            <input
              type="number"
              id="maxAmount"
              placeholder="999.99"
              step="0.01"
              value={filters.maxAmount}
              onChange={(e) => handleFilterChange("maxAmount", e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="status">Estado</label>
            <select
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
          <div className="filter-actions">
            <button className="apply-filters" onClick={applyFilters}>
              🔍 Aplicar
            </button>
            <button className="clear-filters" onClick={clearFilters}>
              🗑️ Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="history-stats">
        <div className="stat-card">
          <div className="stat-value sales">{stats.totalSales}</div>
          <div className="stat-label">Ventas Totales</div>
        </div>
        <div className="stat-card">
          <div className="stat-value revenue">
            {formatCurrency(stats.totalRevenue)}
          </div>
          <div className="stat-label">Ingresos Totales</div>
        </div>
        <div className="stat-card">
          <div className="stat-value customers">{stats.uniqueCustomers}</div>
          <div className="stat-label">Clientes Únicos</div>
        </div>
        <div className="stat-card">
          <div className="stat-value average">
            {formatCurrency(stats.averageTransaction)}
          </div>
          <div className="stat-label">Promedio por Venta</div>
        </div>
      </div>

      {/* Contenido de transacciones */}
      <div className="history-content">
        <div className="content-header">
          <h3>Transacciones</h3>
          <div className="results-count">
            {filteredTransactions.length} resultado
            {filteredTransactions.length !== 1 ? "s" : ""}
          </div>
        </div>

        {isLoading ? (
          <div className="empty-state">
            <div className="empty-icon">⏳</div>
            <div className="empty-title">Cargando...</div>
            <div className="empty-message">
              Por favor espere mientras se procesan los filtros
            </div>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <div className="empty-title">No hay transacciones</div>
            <div className="empty-message">
              No se encontraron transacciones que coincidan con los filtros
              aplicados
            </div>
          </div>
        ) : (
          <div className="history-table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>ID Transacción</th>
                  <th>Usuario</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Productos</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="transaction-id">{transaction.id}</td>
                    <td className="user-id">{transaction.userId}</td>
                    <td className="date">{formatDate(transaction.date)}</td>
                    <td>{formatTime(transaction.time)}</td>
                    <td>
                      <div className="products-list">
                        {transaction.products.map((product, index) => (
                          <span key={index} className="product-item">
                            {product.quantity}x {product.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="amount">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="status">
                      {renderStatusBadge(transaction.status)}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="view-details-btn"
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
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
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
                  className={currentPage === page ? "active" : ""}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente →
            </button>

            <div className="page-info">
              Página {currentPage} de {totalPages}
            </div>
          </div>
        )}
      </div>

      {/* Modal de detalles de transacción */}
      {showModal && selectedTransaction && (
        <div className="transaction-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalles de Transacción</h2>
              <button className="close-btn" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="transaction-details">
              <div className="detail-item">
                <div className="detail-label">ID de Transacción</div>
                <div className="detail-value transaction-id">
                  {selectedTransaction.id}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Usuario</div>
                <div className="detail-value">{selectedTransaction.userId}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Fecha y Hora</div>
                <div className="detail-value">
                  {formatDate(selectedTransaction.date)} a las{" "}
                  {formatTime(selectedTransaction.time)}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Estado</div>
                <div className="detail-value">
                  {renderStatusBadge(selectedTransaction.status)}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Total</div>
                <div className="detail-value amount">
                  {formatCurrency(selectedTransaction.amount)}
                </div>
              </div>
            </div>

            <div className="products-detail">
              <div className="products-title">Productos Comprados</div>
              <table className="products-table">
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
                      <td className="price">{formatCurrency(product.price)}</td>
                      <td className="total">
                        {formatCurrency(product.price * product.quantity)}
                      </td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td colSpan="3">
                      <strong>TOTAL</strong>
                    </td>
                    <td className="total">
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
      )}
    </div>
  );
};

export default History;
