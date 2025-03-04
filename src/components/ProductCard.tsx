import { Img, Heading, Button } from "../utils";
import { Icons } from "../utils/Icons.tsx";
import styles from "../scss/components/ProductCard.module.scss";

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
      <Heading as="p" className={styles.discountBadge}>
        {discountText}
      </Heading>
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
  const truncatedDescription = truncateText(description, 20);
  const truncatedName = truncateText(name, 10);

  return (
    <div
      id={id}
      className={`${className} ${styles.productContainer}`}
      role="article"
      aria-label={`Product: ${name}`}
      {...restProps}
    >
      <div className={styles.imageWrapper}>
        <Img src={image} alt={name} className={styles.productImage} />
        <DiscountBadge discountText={discountText} />
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.textContainer}>
          <Heading as="h4" size="headingmd" className={styles.productName}>
            {truncatedName}
          </Heading>
          <Heading as="p" className={styles.productDescription}>
            {truncatedDescription}
          </Heading>
        </div>

        <div className={styles.priceContainer}>
          <Heading as="h5" size="headings" className={styles.currentPrice}>
            {currentPrice}
          </Heading>
          <Heading as="p" className={styles.originalPrice}>
            {originalPrice}
          </Heading>
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
