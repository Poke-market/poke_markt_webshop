import { Heading, Button } from "../utils";
import styles from "../scss/components/RelatedProducts.module.scss";

const RelatedProduct = () => {
  return (
    <div className={styles.container}>
      <div className={styles.internalContainer}>
        <Heading as="h2" size="text2xl">
          Related Products
        </Heading>
        <div className={styles.relatedProducts}>
          <div>
            <img src="https://picsum.photos/150" alt="related product" />
            <p>Product Name</p>
            <p>$100</p>
          </div>
          <div>
            <img src="https://picsum.photos/150" alt="related product" />
            <p>Product Name</p>
            <p>$100</p>
          </div>
          <div>
            <img src="https://picsum.photos/150" alt="related product" />
            <p>Product Name</p>
            <p>$100</p>
          </div>
          <div>
            <img src="https://picsum.photos/150" alt="related product" />
            <p>Product Name</p>
            <p>$100</p>
          </div>
        </div>
        <Button className={styles.showBtn}>Show More</Button>
      </div>
    </div>
  );
};

export default RelatedProduct;
