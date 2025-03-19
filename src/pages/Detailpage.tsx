import styles from "../styles/pages/DetailPage.module.scss";
import { Breadcrumb, Related, Heading, Loading, ProductInfo } from "../utils";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";

const DetailPage = () => {
  const { slug } = useParams();
  const { product, loading, availableProducts } = useProduct(slug);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className={styles.productDetail}>
        <div className={styles.notFound}>
          <Heading as="h2" size="textmd" className={styles.notFoundTitle}>
            Product not found
          </Heading>
          <p>Sorry, we couldn't find a product matching "{slug}".</p>
          {availableProducts.length > 0 && (
            <div className={styles.availableProducts}>
              <Heading
                as="h3"
                size="textlg"
                className={styles.recommendationsTitle}
              >
                Recommended Products:
              </Heading>
              <ul>
                {availableProducts.map((item) => (
                  <li key={item._id}>
                    <Link to={`/item/${item.name}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb />
      <ProductInfo product={product} />
      <Related />
    </>
  );
};

export default DetailPage;
