import '../assets/scss/Header.scss';
import Icons from '../assets/Icons';
import { sizes, HeadingProps, HeaderProps } from '../types/types';
import ReactLogo from '../assets/react.png';

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
      <img src={ReactLogo} alt="Headerlogo" className="header-logo" />
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
