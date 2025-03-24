import CollapsableFieldset from "./CollapsableFieldset.tsx";
import LabelCheckbox from "./LabelCheckbox.tsx";
import PillCheckbox from "./PillCheckbox.tsx";
import PriceRangeSlider from "./PriceRangeSlider.tsx";
import styles from "../../styles/components/filters/FilterForm.module.scss";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useGetTagsQuery } from "../../store/pokemartApi.ts";
import { useAppSelector } from "../../store";
import {
  selectCategorieCounts,
  selectPriceRange,
  selectTotalCount,
} from "../../store/filterSlice.ts";

const FilterForm = () => {
  // State for filter values
  const [searchParams] = useSearchParams();
  const { data: tags } = useGetTagsQuery();
  const categorieCounts = useAppSelector(selectCategorieCounts);
  const totalCount = useAppSelector(selectTotalCount);
  const priceRange = useAppSelector(selectPriceRange);
  const location = useLocation();
  const navigate = useNavigate();

  const applyFiltersAndResetPage = () => {
    const pathParts = location.pathname.split("/");

    // if path ends with a page number, remove it
    if (!Number.isNaN([...pathParts].pop())) pathParts.pop();

    let link = pathParts.join("/");
    if (searchParams.size > 0) link += `?${searchParams}`;

    void navigate(link);
  };

  return (
    <form className={styles.form}>
      <CollapsableFieldset
        className={styles.categories}
        legend="Categories"
        subLegend={totalCount.toString()}
      >
        <ul>
          {Object.entries(categorieCounts).map(([category, count]) => (
            <li key={category}>
              <LabelCheckbox
                label={category}
                name="category"
                subLabel={count}
                checked={searchParams.has("cat", category)}
                onChange={() => {
                  if (searchParams.has("cat", category))
                    searchParams.delete("cat", category);
                  else searchParams.append("cat", category);
                  applyFiltersAndResetPage();
                }}
              />
            </li>
          ))}
        </ul>
      </CollapsableFieldset>

      <CollapsableFieldset className={styles.tags} legend="Tags">
        <ul>
          {tags?.map((tag) => (
            <li key={tag}>
              <PillCheckbox
                label={tag}
                name="tag"
                checked={searchParams.has("tag", tag)}
                onChange={() => {
                  if (searchParams.has("tag", tag))
                    searchParams.delete("tag", tag);
                  else searchParams.append("tag", tag);
                  applyFiltersAndResetPage();
                }}
              />
            </li>
          ))}
        </ul>
      </CollapsableFieldset>

      <CollapsableFieldset legend="Price">
        <div className="price-filter">
          <PriceRangeSlider
            min={priceRange.min}
            max={priceRange.max}
            initialMin={Math.max(
              Number(searchParams.get("minPrice")) || priceRange.min,
              priceRange.min,
            )}
            initialMax={Math.min(
              Number(searchParams.get("maxPrice")) || priceRange.max,
              priceRange.max,
            )}
            onChangeComplete={(range) => {
              searchParams.set("minPrice", range.min.toString());
              searchParams.set("maxPrice", range.max.toString());
              if (range.min === priceRange.min) searchParams.delete("minPrice");
              if (range.max === priceRange.max) searchParams.delete("maxPrice");
              applyFiltersAndResetPage();
            }}
          />
        </div>
      </CollapsableFieldset>
    </form>
  );
};

export default FilterForm;
