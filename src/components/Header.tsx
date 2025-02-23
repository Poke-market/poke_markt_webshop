import Heading from "./Headingtxt.tsx";
import Icons from "../utils/Icons.tsx";
import { HeaderProps } from "../types/types";
import PokeLogo from "../assets/poke.png";
import styles from "../scss/components/Header.module.scss";

export default function Header({ className = "", ...props }: HeaderProps) {
  return (
    <header className={`${styles.header} ${className}`} {...props}>
      <img src={PokeLogo} alt="Headerlogo" className={styles.headerLogo} />
      <ul className={styles.navList}>
        <li>
          <a href="#">
            <Heading>Home</Heading>
          </a>
        </li>
        <li>
          <a href="#">
            <Heading>Shop</Heading>
          </a>
        </li>
        <li>
          <a href="#">
            <Heading>About</Heading>
          </a>
        </li>
        <li>
          <a href="#">
            <Heading>Contact</Heading>
          </a>
        </li>
      </ul>
      <div className={styles.iconContainer}>
        <a href="#" aria-label="Profile">
          {Icons.mdiAccountAlertOutline}
        </a>
        <a href="#" aria-label="Search">
          {Icons.Search}
        </a>
        <a href="#" aria-label="Wishlist">
          {Icons.Heart}
        </a>
        <a href="#" aria-label="Shopping Cart">
          {Icons.ShoppingBag}
        </a>
      </div>
    </header>
  );
}

export { Heading };
