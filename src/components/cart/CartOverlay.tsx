import { useAppDispatch, useAppSelector } from "../../store";
import {
  decrementQuantity,
  selectCartItems,
  selectCartTotalPrice,
  clearCart,
  removeItem,
} from "../../store/cartSlice";
import { Overlay } from "../common/Overlay";
import OverlayItem from "../common/OverlayItem";

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
      renderContent={(cartItem) => <OverlayItem {...cartItem} />}
      getContentKey={(cartItem) => cartItem.item._id}
      onRemove={({ item, quantity }) =>
        quantity > 1
          ? dispatch(decrementQuantity(item._id))
          : dispatch(removeItem(item._id))
      }
    />
  );
};
