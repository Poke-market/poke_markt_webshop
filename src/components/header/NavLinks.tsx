import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Heading } from "../common";
import { headerLinks } from "../../config";
import styles from "../../styles/components/common/Header.module.scss";

type NavLinksProps = {
  onNavigate?: () => void;
};

const NavLinks = ({ onNavigate }: NavLinksProps) => (
  <ul className={styles.navList}>
    {headerLinks.navLinks.map((item) => (
      <li key={item.path}>
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
