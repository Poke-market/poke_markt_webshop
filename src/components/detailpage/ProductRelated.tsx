import { Heading, Button } from "../common";
import styles from "../../styles/components/detailpage/RelatedProducts.module.scss";
import { ProductCard } from "../home";
import { Item } from "../../types/apiTypes/item";
import { useGetItemsQuery } from "../../store/pokemartApi";
import { useMemo } from "react";

interface ProductRelatedProps {
  currentProduct: Item;
}

const ProductRelated = ({ currentProduct }: ProductRelatedProps) => {
  const { data: productsData } = useGetItemsQuery({
    page: 1,
    limit: 50,
  });

  const relatedProducts = useMemo(() => {
    if (!productsData?.items) return [];
    return productsData.items
      .filter(
        (product) =>
          product._id !== currentProduct._id &&
          product.category === currentProduct.category,
      )
      .slice(0, 4);
  }, [productsData?.items, currentProduct]);

  if (!relatedProducts.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <section className={styles.internalContainer} title="Related Products">
        <Heading as="h2" size="heading3xl">
          Related Products
        </Heading>
        <ul className={styles.relatedProducts}>
          {relatedProducts.map((product) => (
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

export default ProductRelated;
