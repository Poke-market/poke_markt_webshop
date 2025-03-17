import styles from "../../styles/components/filters/FilterSortBar.module.css";
import { Icons } from "../../utils/Icons.tsx";
import { Button, Heading } from "../common";
import { FilterOverlay } from "./FilterOverlay.tsx";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const FilterSortBar = ({ children }: Props) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <div className={styles.filterSortBar}>
        <span>
          <Button
            className={styles.filter}
            onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
          >
            <Icons.Filtering />
            <Heading as="span" size="textxl">
              Filter
            </Heading>
          </Button>
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
      <div className={styles.filteredContent}>
        {children}
        <FilterOverlay
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      </div>
    </>
  );
};
export default FilterSortBar;
