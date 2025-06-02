import { useState } from "react";
import Button from "../components/Button";
import Arrows from "../components/Arrows";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { useFullscreen } from "../hooks/useFullscreen";
import { useAuth } from "../context/useAuth";

const Products = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState(""); // Nuevo estado para ID de usuario
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { logout } = useAuth();

  const handleCloseCaja = () => {
    if (window.confirm("¿Está seguro que desea cerrar la caja?")) {
      // Solo hacer logout, el contexto se encarga de la navegación
      logout();
    }
  };

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
    if (!userId.trim()) {
      alert("Por favor, ingrese el ID del usuario");
      return;
    }

    const totalWithTax = total + total * 0.18;
    alert(
      `Pago procesado para Usuario ID: ${userId}\nTotal: RD$${totalWithTax.toFixed(
        2
      )}`
    );
    setCart([]);
    setTotal(0);
    setUserId("");
  };

  return (
    <main className="productos-container">
      <section className="productos-sidebar">
        {" "}
        <div className="productos-sidebar__header">
          {" "}
          <div className="menu__buttons">
            <Button
              className="menu__buttons--primary"
              variant="secondary"
              type="button"
              onClick={() => navigate("/home")}
            >
              Volver
            </Button>
            <Button
              className="menu__buttons--primary"
              variant="danger"
              type="button"
              onClick={handleCloseCaja}
            >
              Cerrar caja
            </Button>
            <Button
              className="menu__buttons--secondary"
              variant="primary"
              type="button"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? "ESC" : "Fullscreen"}
            </Button>
          </div>
          <h2>Menú</h2>{" "}
        </div>{" "}
        <section className="categorias-navigation-container">
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
        </section>{" "}
        <section className="productos-grid-container">
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
        </section>
      </section>

      <aside className="carrito-container">
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
          )}{" "}
        </div>
        <div className="user-id-section">
          <label htmlFor="userId" className="user-id-label">
            ID del Usuario:
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Ingrese el ID del usuario"
            className="user-id-input"
          />
        </div>
        <div className="carrito-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>RD${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>ITBIS</span>
            <span>RD${(total * 0.18).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>RD${(total + total * 0.18).toFixed(2)}</span>
          </div>
        </div>{" "}
        <Button
          variant="tertiary"
          size="lg"
          onClick={handlePayment}
          disabled={cart.length === 0 || !userId.trim()}
          className="pagar-button"
        >
          Pagar
        </Button>
      </aside>
    </main>
  );
};

export default Products;
