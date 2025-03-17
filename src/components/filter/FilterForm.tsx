import CollapsableFieldset from "./CollapsableFieldset.tsx";
import LabelCheckbox from "./LabelCheckbox.tsx";
import PillCheckbox from "./PillCheckbox.tsx";
import PriceRangeSlider from "./PriceRangeSlider.tsx";
import styles from "../../styles/components/filters/FilterForm.module.scss";

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
let timerId: number | null = null;
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  console.log("categories", fd.getAll("categorie[]"));
  console.log("tags", fd.getAll("tag[]"));
  console.log("minPrice", fd.get("minPrice"));
  console.log("maxPrice", fd.get("maxPrice"));
}

function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
  const form = e.currentTarget;
  if (timerId) clearTimeout(timerId);
  timerId = setTimeout(() => {
    form.requestSubmit();
  }, 300);
}
const FilterForm = () => {
  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
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
          <PriceRangeSlider min={100} max={999999} />
        </div>
      </CollapsableFieldset>
    </form>
  );
};
export default FilterForm;
