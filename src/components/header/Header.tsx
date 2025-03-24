import { useState } from "react";
import styles from "../../styles/components/common/Header.module.scss";
import { CartOverlay } from "../cart/CartOverlay";
import { WishlistOverlay } from "../wishlist/WishlistOverlay";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Logo, NavLinks, IconLinks } from "./index";
import { getToastResponse } from "../../config/toastResponses";
import { useAppSelector } from "../../store";
import { toast } from "react-toastify";

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth) as unknown as {
    user: { _id: string };
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCartOpen(true);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!user) {
      const { message, options } = getToastResponse("wishlistNotLoggedIn");
      toast.error(message, options);
      return;
    }
    setIsWishlistOpen(true);
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
        <Logo />
        <NavLinks />
        <IconLinks
          onCartClick={handleCartClick}
          onWishlistClick={handleWishlistClick}
          onProfileClick={handleProfileClick}
        />
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
