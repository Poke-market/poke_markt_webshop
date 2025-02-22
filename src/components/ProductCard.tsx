import { Img, Heading } from "./index";
import styles from "../scss/components/ProductCard.module.scss";
import { ProductProps } from "../types/types.ts";

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
  return (
    <div
      id={id.toString()}
      className={`${className} ${styles.productContainer}`}
      {...restProps}
    >
      <div className={styles.imageWrapper}>
        <Img src={image} alt={name} className={styles.productImage} />
        <DiscountBadge discountText={discountText} />
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.textContainer}>
          <Heading as="h4" size="headingmd" className={styles.productName}>
            {name}
          </Heading>
          <Heading as="p" className={styles.productDescription}>
            {description}
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
