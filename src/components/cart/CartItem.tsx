import { CartItem as CartItemType } from "../../store/cartSlice";
import { Img } from "../common";
import styles from "../../styles/components/cart/CartItem.module.scss";

type Props = CartItemType;

const CartItem = ({ item, quantity }: Props) => {
  return (
    <div className={styles.cartItem}>
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
export default CartItem;
