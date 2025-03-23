import { useAppDispatch, useAppSelector } from "../../store";
import {
  removeItem,
  selectCartItems,
  selectCartTotalPrice,
  clearCart,
} from "../../store/cartSlice";
import { Overlay } from "../common/Overlay";
import CartItem from "./CartItem";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartOverlay = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalCartPrice = useAppSelector(selectCartTotalPrice);

  return (
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      title="Shopping Cart"
      onClear={() => dispatch(clearCart())}
      clearIcon="Bagx"
      showSubtotal={true}
      subtotalAmount={totalCartPrice}
      actionButtons={[
        {
          text: "Cart",
          to: "/cart",
        },
        {
          text: "Checkout",
          to: "/checkout",
        },
        {
          text: "Comparison",
          to: "/comparison",
        },
      ]}
      content={cartItems}
      renderContent={(cartItem) => <CartItem {...cartItem} />}
      getContentKey={(cartItem) => cartItem.item._id}
      onRemove={(cartItem) => dispatch(removeItem(cartItem.item._id))}
    />
  );
};
