import Button from "./Button";

const InventoryProductModal = ({
  showModal,
  setShowModal,
  modalMode,
  formData,
  formErrors,
  categories,
  handleInputChange,
  handleSubmit,
}) => {
  if (!showModal) return null;

  return (
    <div className="product-modal">
      <div className="modal-content">
        <h2>{modalMode === "add" ? "Agregar Producto" : "Editar Producto"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre del Producto</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {formErrors.name && <p className="error-text">{formErrors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio (RD$)</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            {formErrors.price && (
              <p className="error-text">{formErrors.price}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formErrors.category && (
              <p className="error-text">{formErrors.category}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="tax">Impuesto</label>
            <select
              id="tax"
              name="tax"
              value={formData.tax || "0"}
              onChange={handleInputChange}
              required
            >
              <option value="0">Ninguno</option>
              <option value="16">16%</option>
              <option value="18">18%</option>
            </select>
            {formErrors.tax && <p className="error-text">{formErrors.tax}</p>}
          </div>
          <div className="modal-actions">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="tertiary" type="submit">
              {modalMode === "add" ? "Agregar" : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryProductModal;
