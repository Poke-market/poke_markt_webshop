import { useState } from "react";
import styles from "../../styles/components/common/Header.module.scss";
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
