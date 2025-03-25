import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Heading } from "../common";
import { headerLinks } from "../../config";
import styles from "../../styles/components/header/Header.module.scss";

type NavLinksProps = {
  onNavigate?: () => void;
};

const NavLinks = ({ onNavigate }: NavLinksProps) => (
  <ul className={styles.navList}>
    {/* Map through the nav links from the config */}
    {headerLinks.navLinks.map((item) => (
      <li key={item.path}>
        {/* Render NavLink for each nav link */}
        <NavLink
          to={item.path}
          className={({ isActive }) => clsx(isActive && styles.active)}
          onClick={onNavigate}
        >
          <Heading>{item.label}</Heading>
        </NavLink>
      </li>
    ))}
  </ul>
);

export default NavLinks;
