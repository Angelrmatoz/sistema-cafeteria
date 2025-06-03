const ProductsGrid = ({ filteredProducts, addToCart }) => {
  return (
    <section className="productos-grid-container">
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
      </div>
    </section>
  );
};

export default ProductsGrid;
