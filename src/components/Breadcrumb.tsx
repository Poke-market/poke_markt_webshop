import styles from "../scss/components/Breadcrumb.module.scss";

const Breadcrumb = () => {
  return (
    <div className={styles.breadcrumb}>
      <div className={styles.breadcrumbItem}>
        <p>Home</p>
      </div>
    </div>
  );
};
export default Breadcrumb;
