import { Img, Text } from "../common";
import styles from "../../styles/components/shop/productCard.module.scss";
import { Link } from "react-router-dom";
import { Item } from "../../types/apiTypes/item";
import { titleCase } from "../../utils/stringUtils";
import { DiscountBadge } from "./DiscountBadge";
import { truncateText } from "../../utils/textUtils";
import { ProductActionButtons } from "./ActionButtons";

interface ProductCardProps {
  item: Item;
  className?: string;
  onClick?: () => void;
}

export const ProductCard = ({
  item,
  className = "",
  onClick,
  ...restProps
}: ProductCardProps) => {
  const { _id: id, name, description, photoUrl, discount, slug } = item;
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

        <PriceDisplay item={item} />
      </div>

      <ProductActionButtons item={item} onAddToCart={onClick} />
    </div>
  );
};

// Optional: You could also separate the price display
const PriceDisplay = ({ item }: { item: Item }) => (
  <div className={styles.priceContainer}>
    <Text as="h5" size="textxl" className={styles.currentPrice}>
      ${item.discount.discountedPrice}
    </Text>
    {item.discount.hasDiscount && (
      <Text className={styles.originalPrice}>${item.price}</Text>
    )}
  </div>
);

export default ProductCard;
