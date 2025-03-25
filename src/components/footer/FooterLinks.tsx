import { Heading } from "../common";
import { Link } from "react-router-dom";
import styles from "../../styles/components/common/Footer.module.scss";
import { FooterLinksProps } from "./FooterTypes";

const FooterLinks = ({ title, links, className }: FooterLinksProps) => (
  <div className={className}>
    <Heading className={styles.footerHeading}>{title}</Heading>
    <ul className={styles.linksList}>
      {links.map((link) => (
        <li key={link.path}>
          <Link to={link.path}>
            <Heading>{link.label}</Heading>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterLinks;
