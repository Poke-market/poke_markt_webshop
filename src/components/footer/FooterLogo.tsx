import { Heading, Text } from "../common";
import styles from "../../styles/components/common/Footer.module.scss";

const FooterLogo = () => (
  <div className={styles.logoSection}>
    <Heading size="headingxl" className={styles.footerLogo}>
      Poke-Mart
    </Heading>
    <Text className={styles.address}>
      Oude Baan 2, 2800 Mechelen
      <br />
      Belgium
    </Text>
  </div>
);

export default FooterLogo;
