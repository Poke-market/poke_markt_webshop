import styles from "../scss/components/Loading.module.css";
const LoadingSkeleton = () => {
  return (
    <div className={styles.shopContainer}>
      <div className={styles.flexContainer}>
        <div className={styles.backgroundBox} />
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.gridContainer}>
              {Array.from({ length: 16 }).map((_, index) => (
                <div key={index} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage} />
                  <div className={styles.skeletonText} />
                  <div className={styles.skeletonText} />
                  <div className={styles.skeletonButton} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
