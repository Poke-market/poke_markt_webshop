import { CartItem } from "../../store/cartSlice";
import { Img } from ".";
import styles from "../../styles/components/common/OverlayItem.module.scss";

type Props = {
  item: CartItem["item"];
  quantity?: CartItem["quantity"];
};

const OverlayItem = ({ item, quantity = 1 }: Props) => {
  return (
    <div className={styles.overlayItem}>
      <div className={styles.itemImage}>
        <Img src={item.photoUrl} alt={item.name} />
      </div>
      <div className={styles.itemInfo}>
        <h3>{item.name}</h3>
        <p>
          <span>{quantity}</span>X
          <span>&euro; {item.discount.discountedPrice}</span>
        </p>
      </div>
    </div>
  );
};
export default OverlayItem;
