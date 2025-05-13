import { useState } from "react";
import Button from "../components/Button";
import Arrows from "../components/Arrows";

const Products = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Categorías de productos
  const categories = [
    { id: 1, name: "Desayunos", color: "#003366", items: 2 },
    { id: 2, name: "Almuerzos", color: "#8cc63f", items: 1 },
    { id: 3, name: "Bebidas", color: "#0071bc", items: 2 },
  ]; // Productos de ejemplo
  const products = [
    { id: 1, name: "Plato del día", price: 259.0, category: 2 },
    { id: 5, name: "Jugo", price: 50.0, category: 3 },
    { id: 6, name: "Refresco", price: 60.0, category: 3 },
    { id: 7, name: "Sandwich", price: 100.0, category: 1 },
    { id: 8, name: "Empanada", price: 70.0, category: 1 },
  ];
  // Filtramos los productos por categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState(1);
  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  // Navegación entre categorías
  const navigateToPreviousCategory = () => {
    const currentIndex = categories.findIndex(
      (cat) => cat.id === selectedCategory
    );
    if (currentIndex > 0) {
      setSelectedCategory(categories[currentIndex - 1].id);
    }
  };

  const navigateToNextCategory = () => {
    const currentIndex = categories.findIndex(
      (cat) => cat.id === selectedCategory
    );
    if (currentIndex < categories.length - 1) {
      setSelectedCategory(categories[currentIndex + 1].id);
    }
  };

  // Añadir producto al carrito
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  // Calcular total
  const calculateTotal = (cartItems) => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  };

  // Procesar pago
  const handlePayment = () => {
    alert(`Pago procesado: $${total.toFixed(2)}`);
    setCart([]);
    setTotal(0);
  };

  return (
    <div className="productos-container">
      <div className="productos-sidebar">
        {" "}
        <div className="productos-sidebar__header">
          <h2>Menú</h2>{" "}
        </div>{" "}
        <div className="categorias-navigation-container">
          <Arrows
            onPrevious={navigateToPreviousCategory}
            onNext={navigateToNextCategory}
            disablePrevious={
              categories.findIndex((cat) => cat.id === selectedCategory) === 0
            }
            disableNext={
              categories.findIndex((cat) => cat.id === selectedCategory) ===
              categories.length - 1
            }
            previousName={
              categories.findIndex((cat) => cat.id === selectedCategory) > 0
                ? categories[
                    categories.findIndex((cat) => cat.id === selectedCategory) -
                      1
                  ]?.name
                : ""
            }
            nextName={
              categories.findIndex((cat) => cat.id === selectedCategory) <
              categories.length - 1
                ? categories[
                    categories.findIndex((cat) => cat.id === selectedCategory) +
                      1
                  ]?.name
                : ""
            }
          />

          <div className="categorias-container">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`categoria-card ${
                  selectedCategory === category.id ? "selected" : ""
                }`}
                style={{ backgroundColor: category.color }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <h3>{category.name}</h3>
                <span>{category.items} productos</span>
              </div>
            ))}
          </div>
        </div>{" "}
        <div className="productos-grid-container">
          {" "}
          <div className="productos-grid">
            {filteredProducts.map((product) => (
              <div
                className="producto-card"
                key={product.id}
                onClick={() => addToCart(product)}
              >
                <div className="producto-image"></div>
                <h4>{product.name}</h4>
                <p className="producto-price">${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>{" "}
        </div>
      </div>

      <div className="carrito-container">
        <h2 className="carrito-title">Cuenta</h2>

        {/* <div className="carrito-tabs">
          <span className="carrito-tab active">Cuenta</span>
          <span className="carrito-tab">Acciones</span>
          <span className="carrito-tab">Cliente</span>
        </div> */}

        <div className="carrito-items">
          {cart.length === 0 ? (
            <p className="empty-cart">No hay productos en el carrito</p>
          ) : (
            cart.map((item) => (
              <div className="carrito-item" key={item.id}>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <span>x{item.quantity}</span>
                </div>
                <div className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>

        <div className="carrito-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>RD${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Impuestos</span>
            <span>RD${(total * 0.07).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>RD${(total + total * 0.07).toFixed(2)}</span>
          </div>
        </div>

        <Button
          className="pagar-button"
          onClick={handlePayment}
          disabled={cart.length === 0}
        >
          Pagar
        </Button>
      </div>
    </div>
  );
};

export default Products;
