import { Heading, Button } from "../common";
import styles from "../../styles/components/detailpage/RelatedProducts.module.scss";
import { ProductCard } from "../home";
import { useProduct } from "../../hooks/useProduct";
import { Item } from "../../types/apiTypes/item";

type RelatedProductProps = {
  slug?: string;
};

const RelatedProduct = ({ slug }: RelatedProductProps) => {
  const { availableProducts } = useProduct(slug);

  return (
    <div className={styles.container}>
      <section className={styles.internalContainer} title="Related Products">
        <Heading as="h2" size="heading3xl">
          Related Products
        </Heading>
        <ul className={styles.relatedProducts}>
          {availableProducts.map((product: Item) => (
            <li key={product._id}>
              <ProductCard item={product} />
            </li>
          ))}
        </ul>
        <Button className={styles.showBtn}>Show More</Button>
      </section>
    </div>
  );
};

export default RelatedProduct;
