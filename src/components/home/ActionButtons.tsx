import { Button } from "../common";
import { Icons } from "../../utils";
import styles from "../../styles/components/home/ProductCard.module.scss";

const ActionButtons = () => {
  return (
    <div className={styles.overlayButtons}>
      <Button className={styles.overlayButton}>
        <span className={styles.icon}>
          <Icons.Share />
        </span>
        Share
      </Button>
      <Button className={styles.overlayButton}>
        <span className={styles.icon}>
          <Icons.ArrowRightLeft />
        </span>
        Compare
      </Button>
      <Button className={styles.overlayButton}>
        <span className={styles.icon}>
          <Icons.Likeheart />
        </span>
        Like
      </Button>
    </div>
  );
};

export default ActionButtons;
