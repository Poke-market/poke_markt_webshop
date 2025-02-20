import '../scss/Header.scss';
import Icons from '../assets/Icons';
import { sizes } from '../utils/sizes';
import { HeadingProps, HeaderProps } from '../types/types';
import PokeLogo from '../assets/poke.png';

// I'm using Heading to be able to use it again in the Footer component
const Heading: React.FunctionComponent<HeadingProps> = ({
  children,
  className = 'text',
  size = 'textlg',
  as: Component = 'p',
  ...restProps
}) => {
  return (
    <Component className={`${sizes[size]} ${className}`} {...restProps}>
      {children}
    </Component>
  );
};

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
