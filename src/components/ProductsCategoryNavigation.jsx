import Arrows from './Arrows';

const ProductsCategoryNavigation = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  navigateToPreviousCategory,
  navigateToNextCategory
}) => {
  return (
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
    </section>
  );
};

export default ProductsCategoryNavigation;