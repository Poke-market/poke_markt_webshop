import { Heading, Button } from "../common";
import styles from "../../styles/components/detailpage/RelatedProducts.module.scss";
import { ProductCard } from "../shop";
import { Item } from "../../types/apiTypes/item";
import { useGetItemsQuery } from "../../store/pokemartApi";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface ProductRelatedProps {
  currentProduct: Item;
}

const ProductRelated = ({ currentProduct }: ProductRelatedProps) => {
  const navigate = useNavigate();

  const { data: productsData } = useGetItemsQuery({
    page: 1,
    limit: 8,
    cat: [currentProduct.category],
  });

  const relatedProducts = useMemo(() => {
    if (!productsData?.items) return [];
    return productsData.items
      .filter((product) => product._id !== currentProduct._id)
      .slice(0, 4);
  }, [productsData?.items, currentProduct._id]);

  const handleShowMore = () => {
    void navigate(`/shop?cat=${encodeURIComponent(currentProduct.category)}`);
  };

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
        <Button className={styles.showBtn} onClick={handleShowMore}>
          Show More
        </Button>
      </section>
    </div>
  );
};

export default ProductRelated;
