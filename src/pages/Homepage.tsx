import {
  ShopGrid,
  UspBanner,
  BannerShop,
  FilterSortBar,
} from "../utils/index.ts";

const Homepage = () => {
  return (
    <>
      <BannerShop title="Shop" />
      <FilterSortBar>
        <ShopGrid />
      </FilterSortBar>
      <UspBanner />
    </>
  );
};

export default Homepage;
