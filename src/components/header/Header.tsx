import { useState } from "react";
import styles from "../../styles/components/header/Header.module.scss";
import { CartOverlay } from "../cart/CartOverlay";
import { WishlistOverlay } from "../wishlist/WishlistOverlay";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  Logo,
  NavLinks,
  IconLinks,
  HamburgerButton,
  MobileMenuOverlay,
} from "./index";

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // handle for the cart icon click
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCartOpen(true);
  };

  // handle for the wishlist icon click
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlistOpen(true);
  };

  // handle for the profile icon click
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

  // handle for the search icon click
  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    void navigate("/shop"); // navigate to the shop page for now
  };

  return (
    <>
      <nav
        className={clsx(styles.header, className, {
          [styles.menuOpen]: isMobileMenuOpen,
        })}
        aria-label="Main Navigation"
      >
        <div className={styles.boxLeft}>
          <Logo />
        </div>

        <HamburgerButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />

        <MobileMenuOverlay
          isOpen={isMobileMenuOpen}
          onClose={toggleMobileMenu}
          logo={<Logo className={styles.mobileLogo} />}
          navLinks={<NavLinks onNavigate={closeMobileMenu} />}
          iconLinks={
            <IconLinks
              onCartClick={handleCartClick}
              onWishlistClick={handleWishlistClick}
              onProfileClick={handleProfileClick}
            />
          }
        />

        <div className={styles.desktopNav}>
          <div className={styles.boxCenter}>
            <NavLinks />
          </div>
          <div className={styles.boxRight}>
            <IconLinks
              onCartClick={handleCartClick}
              onWishlistClick={handleWishlistClick}
              onProfileClick={handleProfileClick}
              onSearchClick={handleSearchClick}
            />
          </div>
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
