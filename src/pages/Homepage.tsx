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
      <FilterSortBar />
      <ShopGrid />
      <UspBanner />
    </>
  );
};

export default Homepage;
