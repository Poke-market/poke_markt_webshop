import {
  Header,
  Footer,
  ShopGrid,
  UsBanner,
  BannerShop,
  FilterSortBar,
} from "../utils/index.ts";

export default function Homepage() {
  return (
    <>
      <Header />
      <BannerShop />
      <FilterSortBar />
      <main>
        <ShopGrid />
      </main>
      <UsBanner />
      <Footer />
    </>
  );
}
