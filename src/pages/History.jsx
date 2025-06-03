import { useState, useEffect } from "react";
import "../layouts/_history.scss";
import sampleTransactions from "../data/transactions";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import HistoryFilters from "../components/HistoryFilters";
import HistoryStats from "../components/HistoryStats";
import TransactionTable from "../components/TransactionTable";
import TransactionDetailModal from "../components/TransactionDetailModal";
import HistoryPagination from "../components/HistoryPagination";
import HistoryExportButtons from "../components/HistoryExportButtons";

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
      <HistoryFilters
        filters={filters}
        handleFilterChange={handleFilterChange}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
      />{" "}
      {/* Estadísticas */}
      <HistoryStats stats={stats} formatCurrency={formatCurrency} />{" "}
      {/* Contenido de transacciones */}
      <section className="history__content">
        <div className="history__content-header">
          <h3 className="history__content-title">Transacciones</h3>
          <div className="history__results-count">
            {filteredTransactions.length} resultado
            {filteredTransactions.length !== 1 ? "s" : ""}
          </div>
        </div>
        <TransactionTable
          transactions={currentTransactions}
          isLoading={isLoading}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          formatTime={formatTime}
          renderStatusBadge={renderStatusBadge}
          viewTransactionDetails={viewTransactionDetails}
        />
        <HistoryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />{" "}
      </section>{" "}
      {/* Modal de detalles de transacción */}
      <TransactionDetailModal
        showModal={showModal}
        selectedTransaction={selectedTransaction}
        closeModal={closeModal}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
        formatTime={formatTime}
        renderStatusBadge={renderStatusBadge}
      />{" "}
      <HistoryExportButtons
        exportToPDF={exportToPDF}
        exportToExcel={exportToExcel}
        filteredTransactions={filteredTransactions}
      />
    </main>
  );
};

export default History;
