import { Link } from "react-router-dom";
import styles from "../../styles/components/home/BrowseRange.module.scss";

const browseRange = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>Browse The Range</h2>
        <p>Check our Best Selection of Products</p>
      </div>
      <section>
        <div className="card">
          <Link to="#">
            <div className="imageContainer">
              <img src="/Pokeballs.webpg" alt="Pokéball" />
            </div>
            <h3>Gotta catch 'em all</h3>
          </Link>
        </div>
        <div className="card">
          <Link to="#">
            <div className="imageContainer">
              <img src="/chansey.png" alt="Pokéball" />
            </div>
            <h3>Care</h3>
          </Link>
        </div>
        <div className="card">
          <Link to="#">
            <div className="imageContainer">
              <img src="/machamp.png" alt="Pokéball" />
            </div>
            <h3>Enhance</h3>
          </Link>
        </div>
      </section>
    </div>
  );
};
export default browseRange;
