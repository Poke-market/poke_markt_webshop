import { Link } from "react-router-dom";
import styles from "../../styles/components/home/BrowseRange.module.scss";

const browseRange = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>Browse The Range</h2>
        <p>Check our Best Selection of Products</p>
      </div>
      <section className={styles.cardsContainer}>
        <div className={styles.card}>
          <Link to="/shop?cat=pokéballs">
            <div className={styles.imageContainer}>
              <img src="/Pokeballs.webp" alt="Pokéball" />
            </div>
          </Link>
          <Link to="/shop?cat=pokéballs">
            <h3>Gotta catch 'em all</h3>
          </Link>
        </div>
        <div className={styles.card}>
          <Link to="/shop?cat=medicine&cat=food&cat=berries&cat=vitamins">
            <div className={styles.imageContainer}>
              <img src="/chansey.png" alt="Pokéball" />
            </div>
          </Link>
          <Link to="/shop?cat=medicine&cat=food&cat=berries&cat=vitamins">
            <h3>Care</h3>
          </Link>
        </div>
        <div className={styles.card}>
          <Link to="/shop?cat=evolution&cat=tm%2Fhm&cat=mega+stones">
            <div className={styles.imageContainer}>
              <img src="/machamp.png" alt="Pokéball" />
            </div>
          </Link>
          <Link to="/shop?cat=evolution&cat=tm%2Fhm&cat=mega+stones">
            <h3>Enhance</h3>
          </Link>
        </div>
      </section>
    </div>
  );
};
export default browseRange;
