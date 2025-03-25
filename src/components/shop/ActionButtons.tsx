import { Button } from "../common";
import { Icons } from "../../utils";
import styles from "../../styles/components/shop/ProductCard.module.scss";
import { useAppDispatch } from "../../store";
import { addItem } from "../../store/cartSlice";
import { Item } from "../../types/apiTypes/item";
import { useWishlist } from "../../hooks/useWishlist";
import clsx from "clsx";
interface ProductActionButtonsProps {
  item: Item;
  onAddToCart?: () => void;
}

export const ProductActionButtons = ({
  item,
  onAddToCart,
}: ProductActionButtonsProps) => {
  const dispatch = useAppDispatch();
  const { isItemInWishlist, toggleItemInWishlist, isUpdatingWishlist } =
    useWishlist();

  const handleAddToCart = () => {
    dispatch(addItem({ item }));
    onAddToCart?.();
  };

  return (
    <div className={styles.overlay}>
      <Button onClick={handleAddToCart}>Add to cart</Button>
      <div className={styles.overlayButtons}>
        <Button className={styles.overlayButton}>
          <span className={styles.icon}>
            <Icons.Share />
          </span>
          Share
        </Button>
        <Button className={styles.overlayButton}>
          <span className={styles.icon}>
            <Icons.ArrowRightLeft />
          </span>
          Compare
        </Button>
        <Button
          className={styles.overlayButton}
          onClick={() => toggleItemInWishlist(item)}
          disabled={isUpdatingWishlist}
        >
          <span className={styles.icon}>
            {isItemInWishlist(item._id) ? (
              <Icons.LikeheartFilled
                className={clsx({
                  [styles.isItemInWishlist]: isItemInWishlist(item._id),
                })}
                style={{ fontSize: "1.8rem" }}
              />
            ) : (
              <Icons.Likeheart
                className={clsx({
                  [styles.isItemInWishlist]: isItemInWishlist(item._id),
                })}
                style={{ fontSize: "1.8rem" }}
              />
            )}
          </span>
          Like
        </Button>
      </div>
    </div>
  );
};

export default ProductActionButtons;
