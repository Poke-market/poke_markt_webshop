import { useState, useRef, useEffect } from "react";
import { headerLinks, Heading } from "../utils";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../scss/components/Header.module.scss";
import clsx from "clsx";
import { CartOverlay } from "./CartOverlay";

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCartOpen(true);
  };

  const handleLoginClick = () => {
    setIsDropdownOpen(false);
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
        <div
          className={styles.iconContainer}
          ref={dropdownRef}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          {headerLinks.iconLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              aria-label={link.label}
              className={({ isActive }) => clsx(isActive && styles.active)}
              onClick={
                link.label === "Shopping Cart" ? handleCartClick : undefined
              }
            >
              <link.icon />
            </NavLink>
          ))}
          {isDropdownOpen && (
            <div className={styles.profileDropdown}>
              <button
                className={styles.dropdownItem}
                onClick={handleLoginClick}
              >
                Click to log in
              </button>
            </div>
          )}
        </div>
      </nav>

      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
