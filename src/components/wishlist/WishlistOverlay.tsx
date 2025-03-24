import { Overlay } from "../common/Overlay";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const WishlistOverlay = ({ isOpen, onClose }: Props) => {
  const clearWishlist = () => {
    //TODO: add wishlist clearing functionality
    console.log("Wishlist cleared");
  };

  return (
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      title="Wishlist"
      onClear={clearWishlist}
      clearIcon="Unlike"
      showSubtotal={false}
      actionButtons={[
        {
          text: "Wishlist",
          to: "/wishlist",
        },
      ]}
      // palace holders till it gets properly implemented
      content={[]}
      renderContent={() => <></>}
      getContentKey={() => "wishlist"}
      onRemove={() => {}}
    />
  );
};

export default WishlistOverlay;
