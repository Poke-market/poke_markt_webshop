import {
  ProductGrid,
  UspBanner,
  PageBanner,
  FilterSortBar,
} from "../utils/index.ts";

const Homepage = () => {
  return (
    <>
      <PageBanner title="Shop" />
      <FilterSortBar>
        <ProductGrid />
      </FilterSortBar>
      <UspBanner />
    </>
  );
};

export default Homepage;
