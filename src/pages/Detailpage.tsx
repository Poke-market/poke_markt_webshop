import { useParams } from "react-router-dom";
import { Related } from "../utils/index.ts";
import ProductInfo from "../components/ProductInfo";
import { useProduct } from "../hooks/useProduct";
import styles from "../scss/components/DetailPage.module.scss";

const Detailpage = () => {
  const { name } = useParams();
  const { product, loading, availableProducts } = useProduct(name);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Product Not Found</h1>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <div className={styles.availableProducts}>
          <h2 className={styles.recommendationsTitle}>Available Products</h2>
          <ul>
            {availableProducts.map((product) => (
              <li key={product._id}>
                <a
                  href={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {product.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductInfo product={product} />
      <Related />
    </>
  );
};

export default Detailpage;
