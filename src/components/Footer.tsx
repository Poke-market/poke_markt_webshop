import { Heading, Input } from "../utils";
import PokeLogo from "../assets/poke.png";
import styles from "../scss/components/Footer.module.scss";
import { HeadFootProps } from "../types/types.ts";

export default function Footer({
  className = "footer",
  ...props
}: HeadFootProps) {
  return (
    <footer {...props} className={`${styles.footer} ${className}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={styles.logoSection}>
              <img
                src={PokeLogo}
                alt="Headerlogo"
                className={styles.footerLogo}
              />

              <Heading as="p" className={styles.address}>
                Oude Baan 2, 2800 Mechelen
                <br />
                Belgium
              </Heading>
            </div>

            <div className={styles.linksSection}>
              <Heading className={styles.footerHeading}>Links</Heading>
              <ul className={styles.linksList}>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    <Heading>Home</Heading>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    <Heading>Shop</Heading>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    <Heading>About</Heading>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    <Heading>Contact</Heading>
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.helpSection}>
              <div className={styles.helpLinks}>
                <Heading className={styles.footerHeading}>Help</Heading>
                <ul className={styles.linksList}>
                  <li>
                    <a href="#">
                      <Heading>Payment Options</Heading>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noreferrer">
                      <Heading>Returns</Heading>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Heading>Privacy Policies</Heading>
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.newsletterSection}>
                <Heading className={styles.footerHeading}>Newsletter</Heading>
                <div className={styles.newsletterInput}>
                  <Input
                    variant="underline"
                    placeholder="Enter Your Email Address"
                    type="email"
                  />
                  <div className={styles.subscribeButton}>
                    <a href="#" className={styles.subscribeLink}>
                      <Heading>SUBSCRIBE</Heading>
                      <div className={styles.divider} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.divider}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.17)" }}
          />
          <Heading className={styles.copyright}>
            <span>&copy; 2025 Poke Market. All rights reserved</span>
          </Heading>
        </div>
      </div>
    </footer>
  );
}
