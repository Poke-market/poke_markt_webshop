import { Heading, Button } from "../common";
import styles from "../../styles/components/detailpage/RelatedProducts.module.scss";
import poke from "../../../public/images/poke.png";
import { ProductCard } from "../home";
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
        <Heading as="h2" size="heading3xl">
          Related Products
        </Heading>
        <ul className={styles.relatedProducts}>
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
