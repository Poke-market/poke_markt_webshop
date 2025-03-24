import WishlistPage from "../components/wishlist/WishList.tsx";
import { PageBanner, UspBanner } from "../components/common";

const WishListPage = () => {
  return (
    <>
      <PageBanner title="Wishlist" />
      <WishlistPage />
      <UspBanner />
    </>
  );
};

export default WishListPage;
