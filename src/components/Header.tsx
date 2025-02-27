import { headerLinks, Heading } from "../utils";
import { NavLink } from "react-router-dom";
import PokeLogo from "../assets/poke.png";
import styles from "../scss/components/Header.module.scss";
import clsx from "clsx";

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  return (
    <nav
      className={clsx(styles.header, className)}
      aria-label="Main Navigation"
    >
      <NavLink to="/" className={styles.logoLink}>
        <img src={PokeLogo} alt="Pokemon Logo" className={styles.headerLogo} />
      </NavLink>
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
      <div className={styles.iconContainer}>
        {headerLinks.iconLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            aria-label={link.label}
            className={({ isActive }) => clsx(isActive && styles.active)}
          >
            {link.icon}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Header;
