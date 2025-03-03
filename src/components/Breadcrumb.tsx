import styles from "../scss/components/Breadcrumb.module.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import Heading from "./Headingtxt";
import { Icons } from "../utils/Icons";

const Breadcrumb = () => {
  const location = useLocation();
  const { itemName } = useParams();

  const formatItemName = (name: string | undefined) => {
    if (!name) return "";
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const isDetailPage = location.pathname.includes("/detail/");

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

        {isDetailPage && itemName && (
          <div className={styles.itemGroup}>
            <span className={styles.pipeSeparator}></span>
            <Heading as="span" className={styles.breadcrumbItem}>
              {formatItemName(itemName)}
            </Heading>
          </div>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
