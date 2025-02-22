import styles from "../scss/components/header.module.scss"; // Importing styles as a module
import Icons from "../utils/Icons.tsx";
import { HeaderProps } from "../types/types";
import ReactLogo from "../assets/react.png";
import Heading from "./Headingtxt";

export default function Header({ className = "", ...props }: HeaderProps) {
  return (
    <header className={`${styles.header} ${className}`} {...props}>
      <img src={ReactLogo} alt="Headerlogo" className={styles["header-logo"]} />
      <ul className={styles["nav-list"]}>
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
      <div className={styles["icon-container"]}>
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
