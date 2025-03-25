import styles from "../../styles/components/common/Breadcrumb.module.scss";
import { Link, useParams } from "react-router-dom";
import { Icons } from "../../utils";
import { useGetItemBySlugQuery } from "../../store/pokemartApi";
import { titleCase } from "../../utils/stringUtils";

const Breadcrumb = () => {
  const { slug } = useParams();
  const { data: item } = useGetItemBySlugQuery(slug ?? "", {
    skip: !slug,
  });

  return (
    <div className={styles.breadcrumb}>
      <div className={styles.breadcrumbContainer}>
        <span className={styles.breadcrumbItem}>
          <Link to="/home">Home</Link>
        </span>
        <span className={styles.separator}>
          <Icons.Arrowrightsmall />
        </span>
        <span className={styles.breadcrumbItem}>
          <Link to="/shop">Shop</Link>
        </span>
        <span className={styles.separator}>
          <Icons.Arrowrightsmall />
        </span>
        {slug && (
          <div className={styles.itemGroup}>
            <span className={styles.pipeSeparator}></span>
            <span className={styles.breadcrumbItem}>
              {titleCase(item?.name)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
