import { Heading, Button } from "../common";
import styles from "../../styles/components/detailpage/RelatedProducts.module.scss";
import { ProductCard } from "../home";
import { useProduct } from "../../hooks/useProduct";
import { useParams } from "react-router-dom";
import { transformData } from "../../utils/transformData";

const RelatedProduct = () => {
  const { slug } = useParams();
  const { availableProducts } = useProduct(slug);
  const transformedProducts = transformData(availableProducts);

  return (
    <div className={styles.container}>
      <section className={styles.internalContainer} title="Related Products">
        <Heading as="h2" size="heading3xl">
          Related Products
        </Heading>
        <ul className={styles.relatedProducts}>
          {transformedProducts.map((product) => (
            <li key={product.id}>
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
        <Button className={styles.showBtn}>Show More</Button>
      </section>
    </div>
  );
};

export default RelatedProduct;
