import Button from './Button';

const ProductsShoppingCart = ({
  cart,
  total,
  userId,
  setUserId,
  removeFromCart,
  handlePayment
}) => {
  return (
    <aside className="carrito-container">
      <h2 className="carrito-title">Cuenta</h2>
      
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
          <span>ITBIS</span>
          <span>RD${(total * 0.18).toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>RD${(total + total * 0.18).toFixed(2)}</span>
        </div>
      </div>
      
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
  );
};

export default ProductsShoppingCart;