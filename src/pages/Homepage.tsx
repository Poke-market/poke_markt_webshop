import {
  ShopGrid,
  UspBanner,
  BannerShop,
  FilterSortBar,
} from "../utils/index.ts";

const Homepage = () => {
  return (
    <>
      <BannerShop />
      <FilterSortBar />
      <ShopGrid />
      <UspBanner />
    </>
  );
};

export default Homepage;
