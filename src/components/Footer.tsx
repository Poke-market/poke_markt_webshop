import { Heading, Input, footerLinks } from "../utils";
import { Link } from "react-router-dom";
import styles from "../scss/components/Footer.module.scss";
import PokeLogo from "../assets/poke.png";
import clsx from "clsx";

type Props = {
  className?: string;
};
export default function Footer({ className }: Props) {
  return (
    <footer className={clsx(styles.footer, className)}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={styles.logoSection}>
              <img
                src={PokeLogo}
                alt="Pokemon Logo"
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
                {footerLinks.mainLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>
                      <Heading>{link.label}</Heading>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.helpSection}>
              <div className={styles.helpLinks}>
                <Heading className={styles.footerHeading}>Help</Heading>
                <ul className={styles.linksList}>
                  {footerLinks.helpLinks.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path}>
                        <Heading>{link.label}</Heading>
                      </Link>
                    </li>
                  ))}
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
                    <Link to="/" className={styles.subscribeLink}>
                      <Heading>SUBSCRIBE</Heading>
                      <div className={styles.divider} />
                    </Link>
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
