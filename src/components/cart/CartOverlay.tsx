import { Overlay } from "../common/Overlay";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartOverlay = ({ isOpen, onClose }: Props) => {
  const clearCart = () => {
    //TODO: add cart clearing functionality
    console.log("Cart cleared");
  };

  return (
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      title="Shopping Cart"
      onClear={clearCart}
      clearIcon="Bagx"
      showSubtotal={true}
      subtotalAmount={0}
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
    />
  );
};
