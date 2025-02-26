import Layout from "../components/Layout.tsx";
import {
  ShopGrid,
  UsBanner,
  BannerShop,
  FilterSortBar,
} from "../utils/index.ts";

export default function Homepage() {
  return (
    <Layout>
      <BannerShop />
      <FilterSortBar />
      <ShopGrid />
      <UsBanner />
    </Layout>
  );
}
