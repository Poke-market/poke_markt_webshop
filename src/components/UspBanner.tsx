import styles from "../scss/components/UspBanner.module.css";

const UspBanner = () => {
  return (
    <div className={styles.uspBanner}>
      <div className={styles.usp}>
        <div>
          <i></i>
        </div>
        <div>
          <p>High Quality</p>
          <span>Crafted from top materials</span>
        </div>
      </div>
      <div className={styles.usp}>
        <div>
          <i></i>
        </div>
        <div>
          <p>Warranty Protection</p>
          <span>Over 2 years</span>
        </div>
      </div>
      <div className={styles.usp}>
        <div>
          <i></i>
        </div>
        <div>
          <p>Free Shipping</p>
          <span>Order over $150</span>
        </div>
      </div>
      <div className={styles.usp}>
        <div>
          <i></i>
        </div>
        <div>
          <p>24 / 7 Support</p>
          <span>Dedicated support</span>
        </div>
      </div>
    </div>
  );
};
export default UspBanner;
