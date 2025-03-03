import { Heading, Button, ProductCard } from "../utils";
import styles from "../scss/components/RelatedProducts.module.scss";
import poke from "../assets/poke.png";
const RelatedProduct = () => {
  const dummy = {
    id: "1",
    name: "Example Product",
    description: "This is an example product description",
    image: poke,
    price: 29.99,
    currentPrice: "$29.99",
    originalPrice: "$39.99",
  };

  return (
    <div className={styles.container}>
      <section className={styles.internalContainer} title="Related Products">
        <Heading as="h2" size="text2xl">
          Related Products
        </Heading>
        <ul className={styles.relatedProducts} title="Related Products">
          <li>
            <ProductCard {...dummy} />
          </li>
          <li>
            <ProductCard {...dummy} />
          </li>
          <li>
            <ProductCard {...dummy} />
          </li>
          <li>
            <ProductCard {...dummy} />
          </li>
        </ul>
        <Button className={styles.showBtn}>Show More</Button>
      </section>
    </div>
  );
};

export default RelatedProduct;
