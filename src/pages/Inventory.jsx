import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InventoryProductTable from "../components/InventoryProductTable";
import InventoryProductModal from "../components/InventoryProductModal";
import InventoryFilters from "../components/InventoryFilters";
import { categories as defaultCategories } from "../data/categories";
import {
  loadInventory,
  saveInventory,
  generateProductId,
  validateProductData,
  calculatePriceWithTax,
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
    tax: "",
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
      category: categories[0]?.id || 1,
      image: "/assets/img/default-product.png",
      tax: "0", // Valor predeterminado para impuesto
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
      tax: product.tax || "0", // Aseguramos que tenga un valor de impuesto
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
  }; // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Limpiar el error relacionado con este campo
    setFormErrors((prev) => ({ ...prev, [name]: "" }));

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? parseFloat(value) || 0
          : name === "category" || name === "tax"
          ? parseInt(value, 10) // Convertir categoría e impuesto a número
          : value,
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
      !filterCategory ||
      parseInt(product.category) === parseInt(filterCategory);
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });
  return (
    <main className="inventory-container">
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

      <InventoryFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        categories={categories}
      />

      {isLoading ? (
        <div className="loading-container">
          <p>Cargando inventario...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>No se encontraron productos que coincidan con la búsqueda.</p>
        </div>
      ) : (
        <InventoryProductTable
          products={filteredProducts}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
          getCategoryName={getCategoryName}
          calculatePriceWithTax={calculatePriceWithTax}
        />
      )}

      <InventoryProductModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalMode={modalMode}
        formData={formData}
        formErrors={formErrors}
        categories={categories}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </main>
  );
};

export default Inventory;
