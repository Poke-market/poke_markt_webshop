import styles from "../scss/components/loading.module.scss";

const LoadingSkeleton = () => {
  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: 16 }).map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonText} />
          <div className={styles.skeletonText} />
          <div className={styles.skeletonButton} />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
