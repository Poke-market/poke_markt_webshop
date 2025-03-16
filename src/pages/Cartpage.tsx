import { UspBanner, BannerShop } from "../utils";
import Cart from "../components/cart/Cart.tsx";

const CartPage = () => {
  return (
    <>
      <BannerShop title="Cart" />
      <Cart />
      <UspBanner />
    </>
  );
};
export default CartPage;
