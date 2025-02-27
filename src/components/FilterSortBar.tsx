import styles from "../scss/components/FilterSortBar.module.css";

const FilterSortBar = () => {
  return (
    <div className={styles.filterSortBar}>
      <span>
        <button className={styles.filter}>
          <i>⪋</i>
        </button>
        <p>Filter</p>
        <button className={styles.gridView}>
          <i>⌗</i>
        </button>
        <button className={styles.listView}>
          <i>📋</i>
        </button>
        <span className={styles.separator}></span>
        <span>
          <p>Showing 1-16 of 32 results</p>
        </span>
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
