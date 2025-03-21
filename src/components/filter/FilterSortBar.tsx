import styles from "../../styles/components/filters/FilterSortBar.module.scss";
import { Icons } from "../../utils/Icons.tsx";
import { Button, Heading } from "../common";
import { FilterOverlay } from "./FilterOverlay.tsx";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CustomSelect from "../common/CustomSelect";

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

  // Options for the CustomSelect components
  const productsOptions = [
    { value: 4, label: "4" },
    { value: 8, label: "8" },
    { value: 12, label: "12" },
    { value: 16, label: "16" },
    { value: 24, label: "24" },
    { value: 32, label: "32" },
  ];

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price (asc)" },
    { value: "price-desc", label: "Price (desc)" },
    { value: "name-asc", label: "Name (asc)" },
    { value: "name-desc", label: "Name (desc)" },
  ];

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
            <CustomSelect
              options={productsOptions}
              value={itemsPerPage}
              onChange={(value: string | number) =>
                setItemsPerPage(Number(value))
              }
              className={styles.showSelect}
              name="productsPerPage"
              id="productsPerPage"
            />
          </fieldset>
          <fieldset>
            <Heading size="textxl" as="span">
              Sort by
            </Heading>
            <CustomSelect
              options={sortOptions}
              value={sort}
              onChange={(value: string | number) => setSort(String(value))}
              className={styles.sortSelect}
              name="sort"
              id="sort"
            />
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
