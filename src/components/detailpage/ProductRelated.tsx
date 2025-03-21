import { Heading, Button } from "../common";
import styles from "../../styles/components/detailpage/RelatedProducts.module.scss";
import poke from "/poke.png?url";
import { ProductCard } from "../home";
import { Item } from "../../types/apiTypes/item";

const RelatedProduct = () => {
  const dummy = {
    _id: "1",
    name: "Example Product",
    description: "This is an example product description",
    photoUrl: poke,
    price: 29.99,
    discount: {
      hasDiscount: true,
      amount: 10,
      type: "percentage",
      discountedPrice: 26.99,
    },
    slug: "example-product",
  } as Item;

  return (
    <div className={styles.container}>
      <section className={styles.internalContainer} title="Related Products">
        <Heading as="h2" size="heading3xl">
          Related Products
        </Heading>
        <ul className={styles.relatedProducts}>
          <li>
            <ProductCard item={dummy} />
          </li>
          <li>
            <ProductCard item={dummy} />
          </li>
          <li>
            <ProductCard item={dummy} />
          </li>
          <li>
            <ProductCard item={dummy} />
          </li>
        </ul>
        <Button className={styles.showBtn}>Show More</Button>
      </section>
    </div>
  );
};

export default RelatedProduct;
