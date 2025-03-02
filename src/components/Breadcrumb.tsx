import styles from "../scss/components/Breadcrumb.module.scss";
import { Link, useLocation, useParams } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const { itemName } = useParams();

  // Format the item name for display (convert hyphens to spaces and capitalize)
  const formatItemName = (name: string | undefined) => {
    if (!name) return "";
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Determine which breadcrumb items to show based on the current path
  const isDetailPage = location.pathname.includes("/detail/");

  return (
    <div className={styles.breadcrumb}>
      <div className={styles.breadcrumbContainer}>
        <Link to="/" className={styles.breadcrumbItem}>
          Home
        </Link>

        {isDetailPage && itemName && (
          <>
            <span className={styles.separator}>&gt;</span>
            <span className={styles.breadcrumbItem}>
              {formatItemName(itemName)}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
