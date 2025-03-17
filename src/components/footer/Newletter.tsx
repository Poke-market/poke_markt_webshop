import { Heading, Input } from "../../utils";
import { Link } from "react-router-dom";
import styles from "../../styles/components/common/Footer.module.scss";

const Newsletter = () => (
  <div className={styles.newsletterSection}>
    <Heading className={styles.footerHeading}>Newsletter</Heading>
    <div className={styles.newsletterInput}>
      <Input
        variant="underline"
        placeholder="Enter Your Email Address"
        type="email"
      />
      <div className={styles.subscribeButton}>
        <Link to="/" className={styles.subscribeLink}>
          <Heading>SUBSCRIBE</Heading>
          <div className={styles.divider} />
        </Link>
      </div>
    </div>
  </div>
);

export default Newsletter;
