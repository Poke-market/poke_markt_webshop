import styles from "../../styles/components/common/Breadcrumb.module.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import { Icons } from "../../utils";
import { useGetItemBySlugQuery } from "../../store/pokemartApi";
import { capitalizeWords } from "../../utils/formatters";

const Breadcrumb = () => {
  const location = useLocation();
  const { slug } = useParams();
  const { data: product } = useGetItemBySlugQuery(slug ?? "", {
    skip: !slug,
  });

  const isProductPage = location.pathname.includes("/item/");

  return (
    <div className={styles.breadcrumb}>
      <div className={styles.breadcrumbContainer}>
        <span className={styles.breadcrumbItem}>
          <Link to="/">Home</Link>
        </span>
        <span className={styles.separator}>
          <Icons.Arrowrightsmall />
        </span>
        <span className={styles.breadcrumbItem}>
          <Link to="/">Shop</Link>
        </span>
        <span className={styles.separator}>
          <Icons.Arrowrightsmall />
        </span>
        {isProductPage && product && (
          <div className={styles.itemGroup}>
            <span className={styles.pipeSeparator}></span>
            <span className={styles.breadcrumbItem}>
              {capitalizeWords(product.name)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
