import styles from "../../styles/components/filters/FilterSortBar.module.scss";
import { Icons } from "../../utils/Icons.tsx";
import { Button, Heading } from "../common";
import { FilterOverlay } from "./FilterOverlay.tsx";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
type Props = {
  children: React.ReactNode;
};

const FilterSortBar = ({ children }: Props) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const _sort = searchParams.get("sort");
  const _order = searchParams.get("order");
  const [sort, setSort] = useState(
    _sort && _order ? `${_sort}-${_order}` : "default",
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(searchParams.get("limit") ?? 16),
  );

  useEffect(() => {
    if (sort === "default") {
      searchParams.delete("sort");
      searchParams.delete("order");
    } else {
      const [sortType, order] = sort.split("-");
      searchParams.set("sort", sortType);
      searchParams.set("order", order);
    }
    setSearchParams(searchParams);
  }, [sort, searchParams, setSearchParams]);

  useEffect(() => {
    if (itemsPerPage === 16) {
      searchParams.delete("limit");
    } else {
      searchParams.set("limit", itemsPerPage.toString());
    }
    setSearchParams(searchParams);
  }, [itemsPerPage, searchParams, setSearchParams]);

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
            <input
              type="number"
              id="productsPerPage"
              placeholder="16"
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              value={itemsPerPage}
            />
          </fieldset>
          <fieldset>
            <Heading size="textxl" as="span">
              Sort by
            </Heading>
            <select
              name="sort"
              id="sort"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price (asc)</option>
              <option value="price-desc">Price (desc)</option>
              <option value="name-asc">Name (asc)</option>
              <option value="name-desc">Name (desc)</option>
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
