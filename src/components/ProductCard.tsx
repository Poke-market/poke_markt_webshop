import Img from "./Img"; // Import the Img component
import Heading from "./Headingtxt.tsx";
import PokeImage from "../assets/poke.png";
import { ProductProps } from "../types/types.ts";
import styles from "../scss/components/ProductCard.module.scss";

export default function ProductDisplay({
  discountText = "-30%",
  productName = "Syltherine",
  productDescription = "Stylish cafe chair",
  currentPrice = "Rp 2.500.000",
  originalPrice = "Rp 3.500.000",
  ...Productprops
}: ProductProps) {
  return (
    <div
      {...Productprops}
      className={`${Productprops.className} ${styles.productContainer}`}
    >
      <div className={styles.imageWrapper}>
        <Img src={PokeImage} alt="Syltherine" className={styles.productImage} />
        <div className={styles.absoluteCenter}>
          <Img
            src={PokeImage}
            alt="Syltherine"
            className={styles.productImage}
          />
          <div className={styles.absoluteCenter}>
            <Img
              src={PokeImage}
              alt="Syltherine"
              className={styles.productImage}
            />
            <div className={styles.absoluteCenter}>
              <Img
                src={PokeImage}
                alt="Syltherine"
                className={styles.productImage}
              />
              <div className={styles.absoluteCenter}>
                <Img
                  src={PokeImage}
                  alt="Syltherine"
                  className={styles.productImage}
                />
                <div className={styles.absoluteCenter}>
                  <Img
                    src={PokeImage}
                    alt="Syltherine"
                    className={styles.productImage}
                  />
                  <div className={styles.absoluteCenter}>
                    <Img
                      src={PokeImage}
                      alt="Syltherine"
                      className={styles.productImage}
                    />
                    <div className={styles.absoluteCenter}>
                      <Img
                        src={PokeImage}
                        alt="Image"
                        className={styles.productImage}
                      />
                      <Heading as="p" className={styles.discountBadge}>
                        {discountText}
                      </Heading>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <div className="flex flex-col items-start">
          <Heading as="h4" size="headingmd" className={styles.productName}>
            {productName}
          </Heading>
          <Heading as="p" className={styles.productDescription}>
            {productDescription}
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
