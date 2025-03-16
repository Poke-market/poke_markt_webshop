import { Img, Heading, Button, Text } from "../../utils";
import { Icons } from "../../utils/Icons.tsx";
import styles from "../../styles/components/home/ProductCard.module.scss";
import { Link } from "react-router-dom";

export type Props = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currentPrice: string;
  originalPrice: string;
  discountText?: string;
  className?: string;
  onClick?: () => void;
};

function truncateText(text: string, maxLength: number): string {
  return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
}

function DiscountBadge({ discountText }: { discountText?: string }) {
  if (!discountText) return null; // renders if we only have a discount

  return (
    <div className={styles.absoluteCenter}>
      <Heading className={styles.discountBadge}>{discountText}</Heading>
    </div>
  );
}

export default function ProductCard({
  id,
  name = "Product Name",
  description = "Product Description",
  image = "",
  currentPrice = "",
  originalPrice = "",
  discountText = "",
  className = "",
  ...restProps
}: Props) {
  const truncatedDescription = truncateText(description, 25);
  const truncatedName = truncateText(name, 20);

  // Create URL-friendly version of the product name
  const urlFriendlyName = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      id={id}
      className={`${className} ${styles.productContainer}`}
      role="article"
      aria-label={`Product: ${name}`}
      {...restProps}
    >
      <Link to={`/detail/${urlFriendlyName}`} className={styles.imageWrapper}>
        <Img src={image} alt={name} className={styles.productImage} />
        <DiscountBadge discountText={discountText} />
      </Link>

      <div className={styles.detailsContainer}>
        <div className={styles.textContainer}>
          <Link
            to={`/detail/${urlFriendlyName}`}
            className={styles.productLink}
          >
            <Text as="h4" size="text2xl" className={styles.productName}>
              {truncatedName}
            </Text>
          </Link>
          <Text className={styles.productDescription}>
            {truncatedDescription}
          </Text>
        </div>

        <div className={styles.priceContainer}>
          <Text as="h5" size="textxl" className={styles.currentPrice}>
            {currentPrice}
          </Text>
          <Text className={styles.originalPrice}>{originalPrice}</Text>
        </div>
      </div>

      <div className={styles.overlay}>
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
      </div>
    </div>
  );
}
