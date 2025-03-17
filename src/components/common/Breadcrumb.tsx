import styles from "../../styles/components/common/Breadcrumb.module.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import { Icons } from "../../utils";

const Breadcrumb = () => {
  const location = useLocation();
  const { name } = useParams();

  const formatItemName = (name: string | undefined) => {
    if (!name) return "";
    return name
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
        {isProductPage && name && (
          <div className={styles.itemGroup}>
            <span className={styles.pipeSeparator}></span>
            <span className={styles.breadcrumbItem}>
              {formatItemName(name)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
