import { UspBanner, PageBanner } from "../utils";
import Cart from "../components/cart/Cart.tsx";

const CartPage = () => {
  return (
    <>
      <PageBanner title="Cart" />
      <Cart />
      <UspBanner />
    </>
  );
};
export default CartPage;
