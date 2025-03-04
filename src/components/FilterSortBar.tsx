import styles from "../scss/components/FilterSortBar.module.css";
import { Icons } from "../utils/Icons";
import Button from "./Button";
import Heading from "./Headingtxt";

const FilterSortBar = () => {
  return (
    <div className={styles.filterSortBar}>
      <span>
        <div className={styles.filter}>
          <Button className={styles.filterIcon}>
            <Icons.Filtering />
          </Button>
          <Heading as="p" size="textxl">
            Filter
          </Heading>
        </div>
        <Button className={styles.gridView}>
          <Icons.GridIcon />
        </Button>
        <Button className={styles.listView}>
          <Icons.ViewList />
        </Button>
        <span className={styles.separator}></span>
        <span>
          <Heading as="p" size="textlg">
            Showing 1-16 of 32 results
          </Heading>
        </span>
      </span>
      <span>
        <fieldset>
          <Heading size="textxl" as="span">
            Show
          </Heading>
          <input type="number" id="productsPerPage" placeholder="16" />
        </fieldset>
        <fieldset>
          <Heading size="textxl" as="span">
            Sort by
          </Heading>
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
