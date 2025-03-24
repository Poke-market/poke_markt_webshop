import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <div className={styles.errorCode}>
          <span>4</span>
          <div className={styles.snorlax}>
            <img src="/snorlax.webp" alt="Snorlax" />
          </div>
          <span>4</span>
        </div>
        <h1 className={styles.errorMessage}>
          <span className={styles.oops}>Oops!</span> A wild Snorlax has blocked
          your path!
        </h1>
        <button onClick={() => navigate(-1)} className={styles.goBackButton}>
          GO BACK
        </button>
      </div>
    </div>
  );
};

export default NotFound;
