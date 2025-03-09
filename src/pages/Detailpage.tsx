import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import Loading from "../components/Loading";
import Heading from "../components/Headingtxt";
import styles from "../scss/components/DetailPage.module.scss";
import { useProduct } from "../hooks/useProduct";
import { Breadcrumb } from "../utils/index.ts";
import { Related } from "../utils/index.ts";

const DetailPage = () => {
  const { name } = useParams();
  const { product, loading, availableProducts } = useProduct(name);

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
          <p>Sorry, we couldn't find a product matching "{name}".</p>
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
                    <a
                      href={`/item/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {item.name}
                    </a>
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
