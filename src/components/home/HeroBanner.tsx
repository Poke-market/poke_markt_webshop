import styles from "../../styles/components/home/HeroBanner.module.scss";
import { Heading } from "../common";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className={styles.heroBanner}>
      <div className={styles.heroBanner__image}>
        <img src="/hero-banner-pokemart.png" alt="Hero Banner" />
      </div>
      <div className={styles.heroBanner__content}>
        <p>
          <span>New Arrival</span>
        </p>
        <div className={styles.heroBanner__heading}>
          <Heading as="h1" size="heading5xl">
            Discover Our
          </Heading>
          <Heading
            as="h1"
            size="heading5xl"
            className={styles.heroBanner__headingSecond}
          >
            New Collection
          </Heading>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
        <Link to="/shop" className={styles.heroBanner__link}>
          Buy Now
        </Link>
      </div>
    </div>
  );
};
export default HeroBanner;
