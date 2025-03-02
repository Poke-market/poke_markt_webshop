import styles from "../scss/components/Breadcrumb.module.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import { Icons } from "../utils/Icons";
import Heading from "./Headingtxt";

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

        {isDetailPage && itemName && (
          <>
            <Heading as="span" className={styles.separator}>
              <Icons.Arrowrightsmall />
            </Heading>
            <Heading as="span" className={styles.breadcrumbItem}>
              {formatItemName(itemName)}
            </Heading>
          </>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
