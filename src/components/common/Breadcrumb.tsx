import styles from "../../styles/components/common/Breadcrumb.module.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import { Icons } from "../../utils";

const Breadcrumb = () => {
  const location = useLocation();
  const { slug } = useParams();

  const formatItemName = (slug: string | undefined) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

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
        {isProductPage && slug && (
          <div className={styles.itemGroup}>
            <span className={styles.pipeSeparator}></span>
            <span className={styles.breadcrumbItem}>
              {formatItemName(slug)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
