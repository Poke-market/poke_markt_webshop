import { useWishlist } from "../../hooks/useWishlist";
import { Overlay } from "../common/Overlay";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const WishlistOverlay = ({ isOpen, onClose }: Props) => {
  const { wishlist, removeItemFromWishlist, clearWishlist } = useWishlist();

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
      content={wishlist ?? []}
      renderContent={() => <></>}
      getContentKey={(item) => item._id}
      onRemove={(item) => removeItemFromWishlist(item._id)}
    />
  );
};
