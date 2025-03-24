import { Img, Heading, Button, Text } from "../common";
import { Icons } from "../../utils";
import styles from "../../styles/components/shop/ProductCard.module.scss";
import { Link } from "react-router-dom";
import { Item } from "../../types/apiTypes/item";
import { titleCase } from "../../utils/stringUtils";
import { useAppDispatch } from "../../store";
import { addItem } from "../../store/cartSlice";
import { useWishlist } from "../../hooks/useWishlist";
import clsx from "clsx";

export type Props = {
  item: Item;
  className?: string;
  onClick?: () => void;
};

function truncateText(text: string, maxLength: number): string {
  return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
}

function DiscountBadge({ amount, type }: { amount?: number; type?: string }) {
  const discountText = type === "percentage" ? `- ${amount}%` : `- $${amount}`;
  return (
    <div className={styles.absoluteCenter}>
      <Heading className={styles.discountBadge}>{discountText}</Heading>
    </div>
  );
}

export default function ProductCard({
  item,
  className = "",
  ...restProps
}: Props) {
  const { _id: id, name, description, photoUrl, price, discount, slug } = item;
  const truncatedDescription = truncateText(description, 25);
  const truncatedName = truncateText(name, 20);
  const dispatch = useAppDispatch();
  const { toggleItemInWishlist, isUpdatingWishlist, isItemInWishlist } =
    useWishlist();

  return (
    <div
      id={id}
      className={`${className} ${styles.productContainer}`}
      role="article"
      aria-label={`Product: ${titleCase(name)}`}
      {...restProps}
    >
      <Link to={`/item/${slug}`} className={styles.imageWrapper}>
        <Img
          src={photoUrl}
          alt={titleCase(name)}
          className={styles.productImage}
        />
        {discount.hasDiscount && <DiscountBadge {...discount} />}
      </Link>

      <div className={styles.detailsContainer}>
        <div className={styles.textContainer}>
          <Link to={`/item/${slug}`} className={styles.productLink}>
            <Text as="h4" size="text2xl" className={styles.productName}>
              {titleCase(truncatedName)}
            </Text>
          </Link>
          <Text className={styles.productDescription}>
            {titleCase(truncatedDescription)}
          </Text>
        </div>

        <div className={styles.priceContainer}>
          <Text as="h5" size="textxl" className={styles.currentPrice}>
            ${discount.discountedPrice}
          </Text>
          {discount.hasDiscount && (
            <Text className={styles.originalPrice}>${price}</Text>
          )}
        </div>
      </div>

      <div className={styles.overlay}>
        <Button onClick={() => dispatch(addItem({ item }))}>Add to cart</Button>
        <div className={styles.overlayButtons}>
          <Button className={styles.overlayButton}>
            <Icons.Share style={{ fontSize: "1.6rem" }} />
            Share
          </Button>
          <Button className={styles.overlayButton}>
            <Icons.ArrowRightLeft style={{ fontSize: "2rem" }} />
            Compare
          </Button>
          <Button
            className={styles.overlayButton}
            onClick={() => toggleItemInWishlist(item)}
            disabled={isUpdatingWishlist}
          >
            {isItemInWishlist(id) ? (
              <Icons.LikeheartFilled
                className={clsx({
                  [styles.isItemInWishlist]: isItemInWishlist(id),
                })}
                style={{ fontSize: "1.8rem" }}
              />
            ) : (
              <Icons.Likeheart
                className={clsx({
                  [styles.isItemInWishlist]: isItemInWishlist(id),
                })}
                style={{ fontSize: "1.8rem" }}
              />
            )}
            Like
          </Button>
        </div>
      </div>
    </div>
  );
}
