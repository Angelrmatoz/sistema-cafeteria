import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { categories as defaultCategories } from "../data/categories";
import {
  loadInventory,
  saveInventory,
  generateProductId,
  validateProductData,
} from "../utils/inventoryHelpers";
import "../layouts/_inventory.scss";

const Inventory = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    image: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [filterCategory, setFilterCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Efecto para cargar datos del localStorage si existen
  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedInventory = loadInventory();
        setInventory(loadedInventory);

        // Cargar categorías actualizadas si existen
        const savedCategories = localStorage.getItem("cafeteria_categories");
        if (savedCategories) {
          setCategories(JSON.parse(savedCategories));
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Efecto para guardar en localStorage cuando el inventario cambie
  useEffect(() => {
    if (!isLoading && inventory.length > 0) {
      saveInventory(inventory);
    }
  }, [inventory, isLoading]);

  // Función para obtener el nombre de la categoría
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Sin categoría";
  };
  // Funciones para manejar las acciones
  const handleAddProduct = () => {
    setModalMode("add");
    setFormErrors({});
    setFormData({
      id: generateProductId(inventory).toString(),
      name: "",
      price: "",
      category: categories[0]?.id || "",
      image: "/assets/img/default-product.png",
    });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setModalMode("edit");
    setFormErrors({});
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image || "/assets/img/default-product.png",
    });
    setShowModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      // Filtramos el producto a eliminar
      const updatedInventory = inventory.filter(
        (product) => product.id !== productId
      );
      setInventory(updatedInventory);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Limpiar el error relacionado con este campo
    setFormErrors((prev) => ({ ...prev, [name]: "" }));

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar datos del formulario
    const validation = validateProductData(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    if (modalMode === "add") {
      // Agregar nuevo producto
      setInventory((prev) => [...prev, formData]);
    } else {
      // Actualizar producto existente
      setInventory((prev) =>
        prev.map((product) => (product.id === formData.id ? formData : product))
      );
    } // Cerrar modal y limpiar formulario
    setShowModal(false);
  };

  // Filtrar productos por categoría y término de búsqueda
  const filteredProducts = inventory.filter((product) => {
    const matchesCategory =
      !filterCategory || product.category.toString() === filterCategory;
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="inventory-container">
      {" "}
      <header className="inventory-header">
        <div className="header-buttons">
          <div className="left-buttons">
            <Button
              variant="danger"
              type="button"
              onClick={() => navigate("/home")}
            >
              Volver
            </Button>
          </div>
          <h1>Inventario de Productos</h1>

          <Button variant="tertiary" type="button" onClick={handleAddProduct}>
            Agregar Producto
          </Button>
        </div>
      </header>
      <div className="inventory-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nombre o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filter">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id.toString()}>
                {cat.name} ({cat.items})
              </option>
            ))}
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="loading-container">
          <p>Cargando inventario...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>No se encontraron productos que coincidan con la búsqueda.</p>
        </div>
      ) : (
        <div className="inventory-table-container">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio (RD$)</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toFixed(2)}</td>
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
      )}
      {/* Modal para agregar/editar producto */}
      {showModal && (
        <div className="product-modal">
          <div className="modal-content">
            <h2>
              {modalMode === "add" ? "Agregar Producto" : "Editar Producto"}
            </h2>
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
                {formErrors.name && (
                  <p className="error-text">{formErrors.name}</p>
                )}
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
      )}
    </main>
  );
};

export default Inventory;
