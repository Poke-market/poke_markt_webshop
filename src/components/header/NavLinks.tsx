import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Heading } from "../common";
import { headerLinks } from "../../config";
import styles from "../../styles/components/common/Header.module.scss";

const NavLinks = () => (
  <ul className={styles.navList}>
    {headerLinks.navLinks.map((item) => (
      <li key={item.path}>
        <NavLink
          to={item.path}
          className={({ isActive }) => clsx(isActive && styles.active)}
        >
          <Heading>{item.label}</Heading>
        </NavLink>
      </li>
    ))}
  </ul>
);

export default NavLinks;
