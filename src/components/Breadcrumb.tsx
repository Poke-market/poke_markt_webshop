import styles from "../scss/components/Breadcrumb.module.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import { Icons, Heading } from "../utils";

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
        <Heading as="span" className={styles.breadcrumbItem}>
          <Link to="/">Home</Link>
        </Heading>
        <Heading as="span" className={styles.separator}>
          <Icons.Arrowrightsmall />
        </Heading>
        <Heading as="span" className={styles.breadcrumbItem}>
          <Link to="/">Shop</Link>
        </Heading>
        <Heading as="span" className={styles.separator}>
          <Icons.Arrowrightsmall />
        </Heading>

        {isProductPage && name && (
          <div className={styles.itemGroup}>
            <span className={styles.pipeSeparator}></span>
            <Heading as="span" className={styles.breadcrumbItem}>
              {formatItemName(name)}
            </Heading>
          </div>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
