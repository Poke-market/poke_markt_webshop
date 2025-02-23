import styles from "../scss/components/Pagination.module.css";

const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <a href="#" className={styles.page}>
        1
      </a>
      <a href="#" className={styles.page}>
        2
      </a>
      <a href="#" className={styles.page}>
        3
      </a>
      <a href="#" className={styles.next}>
        Next
      </a>
    </div>
  );
};
export default Pagination;
