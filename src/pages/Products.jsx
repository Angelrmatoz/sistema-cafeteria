import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { useFullscreen } from "../hooks/useFullscreen";
import { useAuth } from "../context/useAuth";
import MenuToolbar from "../components/MenuToolbar";
import ProductsCategoryNavigation from "../components/ProductsCategoryNavigation";
import ProductsGrid from "../components/ProductsGrid";
import ProductsShoppingCart from "../components/ProductsShoppingCart";
import "../layouts/_products.scss";

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
        <MenuToolbar
          navigate={navigate}
          handleCloseCaja={handleCloseCaja}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
        />

        <ProductsCategoryNavigation
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          navigateToPreviousCategory={navigateToPreviousCategory}
          navigateToNextCategory={navigateToNextCategory}
        />

        <ProductsGrid
          filteredProducts={filteredProducts}
          addToCart={addToCart}
        />
      </section>

      <ProductsShoppingCart
        cart={cart}
        total={total}
        userId={userId}
        setUserId={setUserId}
        removeFromCart={removeFromCart}
        handlePayment={handlePayment}
      />
    </main>
  );
};

export default Products;
