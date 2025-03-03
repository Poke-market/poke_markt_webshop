import { Heading, Button } from "../utils";
import styles from "../scss/components/RelatedProducts.module.scss";

const RelatedProduct = () => {
  return (
    <div className={styles.container}>
      <div className={styles.internalContainer}>
        <Heading as="h2" size="text2xl">
          Related Products
        </Heading>
        <div>Products</div>
        <Button className="button">Show More</Button>
      </div>
    </div>
  );
};

export default RelatedProduct;
