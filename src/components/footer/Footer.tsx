import styles from "../../styles/components/common/Footer.module.scss";
import { footerLinks } from "../../config/links.ts";
import clsx from "clsx";
import { FooterLinks, FooterLogo, Copyright, Newsletter } from "./index.ts";

type Props = {
  className?: string;
};

export default function Footer({ className }: Props) {
  return (
    <footer className={clsx(styles.footer, className)}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.row}>
            <FooterLogo />

            <FooterLinks
              title="Links"
              links={footerLinks.mainLinks}
              className={styles.linksSection}
            />

            <div className={styles.helpSection}>
              <FooterLinks
                title="Help"
                links={footerLinks.helpLinks}
                className={styles.helpLinks}
              />
              <Newsletter />
            </div>
          </div>

          <Copyright />
        </div>
      </div>
    </footer>
  );
}
