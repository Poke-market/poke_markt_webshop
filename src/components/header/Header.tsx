import { useState } from "react";
import styles from "../../styles/components/common/Header.module.scss";
import { CartOverlay } from "../cart/CartOverlay";
import { WishlistOverlay } from "../wishlist/WishlistOverlay";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Logo, NavLinks, IconLinks } from "./index";

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCartOpen(true);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlistOpen(true);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    void navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={clsx(styles.header, className, {
          [styles.menuOpen]: isMobileMenuOpen,
        })}
        aria-label="Main Navigation"
      >
        <Logo />

        <button
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          className={clsx(styles.mobileOverlay, {
            [styles.open]: isMobileMenuOpen,
          })}
        >
          <div className={styles.mobileMenuContent}>
            <Logo className={styles.mobileLogo} />
            <NavLinks onNavigate={closeMobileMenu} />
            <IconLinks
              onCartClick={handleCartClick}
              onWishlistClick={handleWishlistClick}
              onProfileClick={handleProfileClick}
            />
            <button
              className={styles.closeButton}
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              Close
            </button>
          </div>
          <div
            className={styles.backdrop}
            onClick={toggleMobileMenu}
            role="button"
            tabIndex={0}
          ></div>
        </div>

        <div className={styles.desktopNav}>
          <NavLinks />
          <IconLinks
            onCartClick={handleCartClick}
            onWishlistClick={handleWishlistClick}
            onProfileClick={handleProfileClick}
          />
        </div>
      </nav>

      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistOverlay
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </>
  );
};

export default Header;
