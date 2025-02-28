import styles from "../scss/components/FilterSortBar.module.css";
import Icons from "../utils/Icons";
import Button from "./Button";

const FilterSortBar = () => {
  return (
    <div className={styles.filterSortBar}>
      <span>
        <Button className={styles.filterIcon}>
          <Icons.RxMixerHorizontal />
        </Button>
        <p>Filter</p>
        <Button className={styles.gridView}>
          <Icons.PiCirclesFourFill />
        </Button>
        <Button className={styles.listView}>
          <Icons.BsViewList />
        </Button>
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
