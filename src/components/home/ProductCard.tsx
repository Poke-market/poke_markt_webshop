import { Img, Button, Text } from "../common";
import styles from "../../styles/components/home/ProductCard.module.scss";
import { Link } from "react-router-dom";
import { Item } from "../../types/apiTypes/item";
import { titleCase } from "../../utils/stringUtils";
import DiscountBadge from "./DiscountBadge";
import ActionButtons from "./ActionButtons";

export type Props = {
  item: Item;
  className?: string;
  onClick?: () => void;
};

// Utility function to truncate text
function truncateText(text: string, maxLength: number): string {
  return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
}

// ProductCard component
export default function ProductCard({
  item,
  className = "",
  ...restProps
}: Props) {
  const { _id: id, name, description, photoUrl, price, discount, slug } = item;
  const truncatedDescription = truncateText(description, 25);
  const truncatedName = truncateText(name, 20);

  return (
    <div
      id={id}
      className={`${className} ${styles.productContainer}`}
      role="article"
      aria-label={`Product: ${titleCase(name)}`}
      {...restProps}
    >
      {/* Product image with link to product details */}
      <Link to={`/item/${slug}`} className={styles.imageWrapper}>
        <Img
          src={photoUrl}
          alt={titleCase(name)}
          className={styles.productImage}
        />
        {/* discount badge if applicable */}
        {discount.hasDiscount && <DiscountBadge {...discount} />}
      </Link>

      {/* Product details */}
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

        {/* Price details */}
        <div className={styles.priceContainer}>
          <Text as="h5" size="textxl" className={styles.currentPrice}>
            ${discount.discountedPrice}
          </Text>
          {/* original price if discounted */}
          {discount.hasDiscount && (
            <Text className={styles.originalPrice}>${price}</Text>
          )}
        </div>
      </div>

      {/* Overlay with action buttons */}
      <Link to={`/item/${slug}`} className={styles.overlay}>
        <Button>Add to cart</Button>
        <ActionButtons />
      </Link>
    </div>
  );
}
