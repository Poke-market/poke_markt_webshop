import {
  Header,
  Footer,
  ShopGrid,
  UspBanner,
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
      <UspBanner />
      <Footer />
    </>
  );
}
