import styles from "../../styles/components/detailpage/ProductNotFound.module.scss";
import { Heading } from "../../utils";

interface ProductNotFoundProps {
  name: string;
  availableProducts: Array<{ _id: string; name: string }>;
}

const ProductNotFound = ({ name, availableProducts }: ProductNotFoundProps) => {
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
};

export default ProductNotFound;
