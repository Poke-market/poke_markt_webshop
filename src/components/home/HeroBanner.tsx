import styles from "../../styles/components/home/HeroBanner.module.scss";
import { Button, Heading } from "../common";

const HeroBanner = () => {
  return (
    <div className={styles.heroBanner}>
      <div className={styles.heroBanner__image}>
        <img src="/hero-banner-pokemart.jpg" alt="Hero Banner" />
      </div>
      <div className={styles.heroBanner__content}>
        <Heading as="h1">Discover our new collection</Heading>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
        <Button>Buy Now</Button>
      </div>
    </div>
  );
};
export default HeroBanner;
