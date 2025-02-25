import { Img, Heading } from "../utils";
import styles from "../scss/components/ProductCard.module.scss";
import { ProductProps } from "../types/types.ts";

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}

export default function ProductDisplay({
  id,
  name = "Product Name",
  description = "Product Description",
  image = "",
  currentPrice = "",
  originalPrice = "",
  discountText = "",
  className = "",
  ...restProps
}: ProductProps) {
  const truncatedDescription = truncateText(description, 20);
  const truncatedName = truncateText(name, 10);
  return (
    <div
      id={id.toString()}
      className={`${className} ${styles.productContainer}`}
      {...restProps}
    >
      <div className={styles.overlay}>
        <a href="#">Add to cart</a>
        <div>
          <a href="#">Share</a>
          <a href="#">Compare</a>
          <a href="#">Like</a>
        </div>
      </div>
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
    </div>
  );
}

function DiscountBadge({ discountText }: { discountText: string }) {
  return (
    <div className={styles.absoluteCenter}>
      <Heading as="p" className={styles.discountBadge}>
        {discountText}
      </Heading>
    </div>
  );
}
