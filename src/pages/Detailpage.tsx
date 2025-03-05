import { useParams } from "react-router-dom";
import { Related } from "../utils/index.ts";
import ProductInfo from "../components/ProductInfo.tsx";
import { useProduct } from "../hooks/useProduct.ts";
import styles from "../scss/components/DetailPage.module.scss";
import Loading from "../components/Loading.tsx";

const Detailpage = () => {
  const { name } = useParams();
  const { product, loading, availableProducts } = useProduct(name);

  if (loading) {
    return <Loading />;
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
