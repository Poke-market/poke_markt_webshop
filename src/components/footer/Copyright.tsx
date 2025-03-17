import { Heading } from "../common";
import styles from "../../styles/components/common/Footer.module.scss";

const Copyright = () => (
  <>
    <div
      className={styles.divider}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.17)" }}
    />
    <Heading className={styles.copyright}>
      <span>&copy; 2025 Poke Market. All rights reserved</span>
    </Heading>
  </>
);

export default Copyright;
