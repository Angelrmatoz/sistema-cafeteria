const InventoryFilters = ({ 
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  categories,
}) => {
  return (
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
  );
};

export default InventoryFilters;
