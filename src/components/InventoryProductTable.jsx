import Button from "./Button";

const InventoryProductTable = ({
  products,
  handleEditProduct,
  handleDeleteProduct,
  getCategoryName,
  calculatePriceWithTax,
}) => {
  return (
    <div className="inventory-table-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio (RD$)</th>
            <th>Impuesto (%)</th>
            <th>Precio Final (RD$)</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>{product.tax || 0}%</td>
              <td>
                {calculatePriceWithTax(product.price, product.tax).toFixed(2)}
              </td>
              <td>{getCategoryName(product.category)}</td>
              <td className="action-buttons">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEditProduct(product)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryProductTable;
