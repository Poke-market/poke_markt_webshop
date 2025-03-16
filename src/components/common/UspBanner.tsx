import styles from "../../styles/components/common/UspBanner.module.scss";
import { Icons } from "../../utils/Icons.tsx";

const UspBanner = () => {
  return (
    <div className={styles.uspBanner}>
      <div className={styles.usp}>
        <Icons.Trophy className={styles.iconBig} />
        <div>
          <p>High Quality</p>
          <span>Crafted from top materials</span>
        </div>
      </div>
      <div className={styles.usp}>
        <Icons.Warranty className={styles.iconBig} />
        <div>
          <p>Warranty Protection</p>
          <span>Over 2 years</span>
        </div>
      </div>
      <div className={styles.usp}>
        <Icons.Delivery className={styles.iconBig} />
        <div>
          <p>Free Shipping</p>
          <span>Order over $150</span>
        </div>
      </div>
      <div className={styles.usp}>
        <Icons.CustomerService className={styles.iconBig} />
        <div>
          <p>24 / 7 Support</p>
          <span>Dedicated support</span>
        </div>
      </div>
    </div>
  );
};

export default UspBanner;
