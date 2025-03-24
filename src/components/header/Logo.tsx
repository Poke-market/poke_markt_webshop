import { NavLink } from "react-router-dom";
import { Heading } from "../common";
import styles from "../../styles/components/common/Header.module.scss";
import clsx from "clsx";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => (
  <NavLink to="/" className={clsx(styles.logoLink, className)}>
    <img
      src="/poke-mart-logo.png"
      alt="Pokemon Mart Logo"
      className={styles.headerLogo}
    />
    <Heading size="text2xl" className={styles.logoText}>
      Poke-Mart
    </Heading>
  </NavLink>
);

export default Logo;
