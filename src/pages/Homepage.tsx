import {
  ShopGrid,
  UsBanner,
  BannerShop,
  FilterSortBar,
} from "../utils/index.ts";

const Homepage = () => {
  return (
    <>
      <BannerShop />
      <FilterSortBar />
      <ShopGrid />
      <UsBanner />
    </>
  );
};

export default Homepage;
