import CollapsableFieldset from "./CollapsableFieldset.tsx";
import LabelCheckbox from "./LabelCheckbox.tsx";
import PillCheckbox from "./PillCheckbox.tsx";
import PriceRangeSlider from "./PriceRangeSlider.tsx";
import styles from "../../styles/components/filters/FilterForm.module.scss";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectFilterCategories,
  selectFilterPriceRange,
  selectFilterTags,
  toggleFilterCategory,
  toggleFilterTag,
  setFilterPriceRange,
} from "../../store/filterSlice.ts";
import { Category } from "../../types/apiTypes/item.ts";
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
  const filterCategories = useAppSelector(selectFilterCategories);
  const filterPriceRange = useAppSelector(selectFilterPriceRange);
  const filterTags = useAppSelector(selectFilterTags);
  const dispatch = useAppDispatch();

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
                checked={filterCategories.includes(category)}
                onChange={() => dispatch(toggleFilterCategory(category))}
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
                checked={filterTags.includes(tag)}
                onChange={() => dispatch(toggleFilterTag(tag))}
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
            initialMin={filterPriceRange.min}
            initialMax={filterPriceRange.max}
            onChangeComplete={(range) => dispatch(setFilterPriceRange(range))}
          />
        </div>
      </CollapsableFieldset>
    </form>
  );
};

export default FilterForm;
