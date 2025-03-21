import CollapsableFieldset from "./CollapsableFieldset.tsx";
import LabelCheckbox from "./LabelCheckbox.tsx";
import PillCheckbox from "./PillCheckbox.tsx";
import PriceRangeSlider from "./PriceRangeSlider.tsx";
import styles from "../../styles/components/filters/FilterForm.module.scss";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useGetTagsQuery } from "../../store/pokemartApi";
import { useAppSelector } from "../../store";
import {
  selectCategorieCounts,
  selectTotalCount,
} from "../../store/filterSlice";

interface PriceRange {
  min: number;
  max: number;
}

const FilterForm = () => {
  // State for filter values
  const [searchParams] = useSearchParams();
  const { data: tags = [] } = useGetTagsQuery();
  const categorieCounts = useAppSelector(selectCategorieCounts);
  const totalCount = useAppSelector(selectTotalCount);
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
    <form>
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
          {tags.map((tag: string) => (
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
            min={100}
            max={999999}
            initialMin={Number(searchParams.get("minPrice")) || 100}
            initialMax={Number(searchParams.get("maxPrice")) || 999999}
            onChangeComplete={(range: PriceRange) => {
              searchParams.set("minPrice", range.min.toString());
              searchParams.set("maxPrice", range.max.toString());
              if (range.min === 100) searchParams.delete("minPrice");
              if (range.max === 999999) searchParams.delete("maxPrice");
              applyFiltersAndResetPage();
            }}
          />
        </div>
      </CollapsableFieldset>
    </form>
  );
};

export default FilterForm;
