const FilterSortBar = () => {
  return (
    <div className="filter-sort-bar">
      <span>
        <button className="filter">
          <i>⪋</i>
        </button>
        <p>Filter</p>
        <button className="grid-view">
          <i>⌗</i>
        </button>
        <button className="list-view">
          <i>📋</i>
        </button>
        <span className="separator"></span>
        <p>Showing 1-16 of 32 results</p>
      </span>
      <span>
        <fieldset>
          <label htmlFor="productsPerPage">Show</label>
          <input type="number" id="productsPerPage" placeholder="16" />
        </fieldset>
        <fieldset>
          <label htmlFor="sort">Sort by</label>
          <select name="sort" id="sort">
            <option value="default">Default</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </fieldset>
      </span>
    </div>
  );
};
export default FilterSortBar;
