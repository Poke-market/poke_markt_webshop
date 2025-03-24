import { Button } from "../common";
import { Icons } from "../../utils";
import styles from "../../styles/components/shop/productCard.module.scss";
import { useAppDispatch } from "../../store";
import { addItem } from "../../store/cartSlice";
import { Item } from "../../types/apiTypes/item";

interface ProductActionButtonsProps {
  item: Item;
  onAddToCart?: () => void;
}

export const ProductActionButtons = ({
  item,
  onAddToCart,
}: ProductActionButtonsProps) => {
  const dispatch = useAppDispatch();

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
        <Button className={styles.overlayButton}>
          <span className={styles.icon}>
            <Icons.Likeheart />
          </span>
          Like
        </Button>
      </div>
    </div>
  );
};

export default ProductActionButtons;
