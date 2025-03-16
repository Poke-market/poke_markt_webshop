import CollapsableFieldset from "./CollapsableFieldset";
import LabelCheckbox from "./LabelCheckbox";
import PillCheckbox from "./PillCheckbox";
import styles from "../scss/components/FilterForm.module.scss";

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
};

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
  return (
    <form action="">
      <CollapsableFieldset
        className={styles.categories}
        legend="Categories"
        subLegend="9"
      >
        <ul>
          {Object.entries(categories).map(([categorie, count]) => (
            <li key={categorie}>
              <LabelCheckbox
                label={categorie}
                name="categorie[]"
                subLabel={count}
              />
            </li>
          ))}
        </ul>
      </CollapsableFieldset>
      <CollapsableFieldset className={styles.tags} legend="Tags">
        <ul>
          {tags.map((tag) => (
            <li key={tag}>
              <PillCheckbox label={tag} name="tag[]" />
            </li>
          ))}
        </ul>
      </CollapsableFieldset>
      <CollapsableFieldset legend="Price">
        <div className="price-filter">
          {/* Price filter content will go here */}
        </div>
      </CollapsableFieldset>
    </form>
  );
};
export default FilterForm;
