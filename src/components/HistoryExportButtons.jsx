import PropTypes from "prop-types";
import Button from "./Button";

const HistoryExportButtons = ({ exportToPDF, exportToExcel, disabled }) => {
  return (
    <div className="history__export-buttons">
      <Button
        variant="danger"
        onClick={exportToPDF}
        disabled={disabled}
        className="history__export-button"
      >
        Reporte de ventas del día en PDF 📊
      </Button>
      <Button
        variant="tertiary"
        onClick={exportToExcel}
        disabled={disabled}
        className="history__export-button"
      >
        Reporte de ventas del día en Excel 📈
      </Button>
    </div>
  );
};

HistoryExportButtons.propTypes = {
  exportToPDF: PropTypes.func.isRequired,
  exportToExcel: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default HistoryExportButtons;
