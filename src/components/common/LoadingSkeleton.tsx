import styles from "../../scss/components/home/ShopGrid.module.scss";
import skeletonStyles from "../../scss/components/common/Loading.module.scss";

const LoadingSkeleton = () => {
  return (
    <div className={styles.shopContainer}>
      <div className={styles.flexContainer}>
        <div className={styles.backgroundBox} />
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.gridContainer}>
              {Array.from({ length: 16 }).map((_, index) => (
                <div key={index} className={skeletonStyles.skeletonCard}>
                  <div className={skeletonStyles.imageWrapper}>
                    <div className={skeletonStyles.skeletonImage}></div>
                  </div>
                  <div className={skeletonStyles.detailsContainer}>
                    <div className={skeletonStyles.skeletonText}></div>
                    <div className={skeletonStyles.skeletonText}></div>
                    <div className={skeletonStyles.priceContainer}>
                      <div className={skeletonStyles.skeletonText}></div>
                      <div className={skeletonStyles.skeletonText}></div>
                    </div>
                  </div>
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
