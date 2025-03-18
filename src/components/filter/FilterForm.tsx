import CollapsableFieldset from "./CollapsableFieldset.tsx";
import LabelCheckbox from "./LabelCheckbox.tsx";
import PillCheckbox from "./PillCheckbox.tsx";
import PriceRangeSlider from "./PriceRangeSlider.tsx";
import styles from "../../styles/components/filters/FilterForm.module.scss";
import { Category } from "../../types/apiTypes/item.ts";
import { useSearchParams } from "react-router-dom";
// TODO: Get categories from backend
const categories = {
  medicine: 5,
  berries: 10,
  food: 15,
  pokéballs: 20,
  evolution: 25,
  vitamins: 30,
  "tm/hm": 35,
  "mega stones": 40,
} as Record<Category, number>;

// TODO: Get tags from backend
const tags = [
  "new",
  "sale",
  "limited",
  "popular",
  "best seller",
  "featured",
  "bestseller",
];

const FilterForm = () => {
  // State for filter values
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <form>
      <CollapsableFieldset
        className={styles.categories}
        legend="Categories"
        subLegend="9"
      >
        <ul>
          {Object.entries(categories).map(([category, count]) => (
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
                  setSearchParams(searchParams);
                }}
              />
            </li>
          ))}
        </ul>
      </CollapsableFieldset>

      <CollapsableFieldset className={styles.tags} legend="Tags">
        <ul>
          {tags.map((tag) => (
            <li key={tag}>
              <PillCheckbox
                label={tag}
                name="tag"
                checked={searchParams.has("tag", tag)}
                onChange={() => {
                  if (searchParams.has("tag", tag))
                    searchParams.delete("tag", tag);
                  else searchParams.append("tag", tag);
                  setSearchParams(searchParams);
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
            onChangeComplete={(range) => {
              searchParams.set("minPrice", range.min.toString());
              searchParams.set("maxPrice", range.max.toString());
              if (range.min === 100) searchParams.delete("minPrice");
              if (range.max === 999999) searchParams.delete("maxPrice");
              setSearchParams(searchParams);
            }}
          />
        </div>
      </CollapsableFieldset>
    </form>
  );
};

export default FilterForm;
