import { Img, Heading, Button, Text } from "../common";
import { Icons } from "../../utils";
import styles from "../../styles/components/home/ProductCard.module.scss";
import { Link } from "react-router-dom";
import { Item } from "../../types/apiTypes/item";
import { titleCase } from "../../utils/stringUtils";

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

      <Link to={`/item/${slug}`} className={styles.overlay}>
        <Button>Add to cart</Button>
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
      </Link>
    </div>
  );
}
