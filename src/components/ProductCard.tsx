import Img from "./Img";
import Heading from "./Headingtxt.tsx";
import styles from "../scss/components/ProductCard.module.scss";
import { ProductProps } from "../types/types.ts";

export default function ProductDisplay({
  id,
  name = "Product Name",
  description = "Product Description",
  image = "default-image.png",
  price = {
    current: "$0.00",
    original: "$0.00",
    discount: "-0%",
  },
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
        <div className={styles.absoluteCenter}>
          <Heading as="p" className={styles.discountBadge}>
            {price.discount}
          </Heading>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <div className="flex flex-col items-start">
          <Heading as="h4" size="headingmd" className={styles.productName}>
            {name}
          </Heading>
          <Heading as="p" className={styles.productDescription}>
            {description}
          </Heading>
        </div>
        <div className={styles.priceContainer}>
          <Heading as="h5" size="headings" className={styles.currentPrice}>
            {price.current}
          </Heading>
          <Heading as="p" className={styles.originalPrice}>
            {price.original}
          </Heading>
        </div>
      </div>
    </div>
  );
}
