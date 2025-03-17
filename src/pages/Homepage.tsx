import { ProductGrid, PageBanner, FilterSortBar, UspBanner } from "../utils";

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
