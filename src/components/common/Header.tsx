import { useState } from "react";
import { headerLinks, Heading } from "../../utils";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../scss/components/common/Header.module.scss";
import clsx from "clsx";
import { CartOverlay } from "../cart/CartOverlay.tsx";

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCartOpen(true);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    void navigate("/login");
  };

  return (
    <>
      <nav
        className={clsx(styles.header, className)}
        aria-label="Main Navigation"
      >
        <NavLink to="/" className={styles.logoLink}>
          <img
            src="/poke-mart-logo.png"
            alt="Pokemon Mart Logo"
            className={styles.headerLogo}
          />
          <Heading size="text2xl" className={styles.logoText}>
            Poke-Mart
          </Heading>
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
              onClick={
                link.label === "Shopping Cart"
                  ? handleCartClick
                  : link.label === "Profile"
                    ? handleProfileClick
                    : undefined
              }
            >
              <link.icon />
            </NavLink>
          ))}
        </div>
      </nav>

      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
