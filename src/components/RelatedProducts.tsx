import { Heading, Button, ProductCard } from "../utils";
import styles from "../scss/components/RelatedProducts.module.scss";
import poke from "../assets/poke.png";
const RelatedProduct = () => {
  const dummy = {
    id: "1",
    name: "Example Product",
    description: "Product description",
    image: poke,
    price: 29.99,
    currentPrice: "$29.99",
    originalPrice: "$39.99",
  };

  return (
    <div className={styles.container}>
      <div className={styles.internalContainer}>
        <Heading as="h2" size="text2xl">
          Related Products
        </Heading>
        <div className={styles.relatedProducts}>
          <ProductCard {...dummy} />
          <ProductCard {...dummy} />
          <ProductCard {...dummy} />
          <ProductCard {...dummy} />
        </div>
        <Button className={styles.showBtn}>Show More</Button>
      </div>
    </div>
  );
};

export default RelatedProduct;
