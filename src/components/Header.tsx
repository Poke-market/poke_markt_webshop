import '../scss/components/header.scss';
import Heading from './Headingtxt.tsx';
import Icons from '../utils/Icons.tsx';
import { HeaderProps } from '../types/types';
import PokeLogo from '../assets/poke.png';

// I'm using Heading to be able to use it again in the Footer component

export default function Header({ className = '', ...props }: HeaderProps) {
  return (
    <header className={`header ${className}`} {...props}>
      <img src={PokeLogo} alt="Headerlogo" className="header-logo" />
      <ul className="nav-list">
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
      <div className="icon-container">
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
