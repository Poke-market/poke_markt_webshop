import styles from "../../styles/components/shop/ShopGrid.module.scss";
import skeletonStyles from "../../styles/components/common/Loading.module.scss";

/**
 * A loading skeleton component for the Shop grid
 * used ShopGrid styling to align the skeleton with the Shop grid
 * @author Amine Abbouti
 */

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
