import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { headerLinks } from "../../config";
import styles from "../../styles/components/header/Header.module.scss";
import ProfileDropdown from "./ProfileDropdown";
import { useAppSelector } from "../../store";
import { selectCartItemCount } from "../../store/cartSlice";
import { useWishlist } from "../../hooks/useWishlist";
// handlers for the icon links
type IconLinksProps = {
  onCartClick: (e: React.MouseEvent) => void;
  onProfileClick: (e: React.MouseEvent) => void;
  onWishlistClick: (e: React.MouseEvent) => void;
  onSearchClick: (e: React.MouseEvent) => void;
};

// IconLinks component that renders the icon links in the header
const IconLinks = ({
  onCartClick,
  onProfileClick,
  onWishlistClick,
}: IconLinksProps) => {
  const cartItemCount = useAppSelector(selectCartItemCount);
  const { wishlist } = useWishlist();
  const wishlistItemCount = wishlist?.length ?? 0;

  return (
    <div className={styles.iconContainer}>
      {/* Map through the icon links from the config */}
      {headerLinks.iconLinks.map((link) =>
        // Render ProfileDropdown for the "Profile" link
        link.label === "Profile" ? (
          <ProfileDropdown
            key={link.path}
            trigger={
              <div className={styles.iconWrapper} onClick={onProfileClick}>
                <link.icon />
              </div>
            }
          />
        ) : (
          <NavLink
            key={link.path}
            to={link.path}
            aria-label={link.label}
            className={({ isActive }) => clsx(isActive && styles.active)}
            data-cart-item-count={
              link.label === "Shopping Cart"
                ? cartItemCount || undefined
                : link.label === "Wishlist"
                  ? wishlistItemCount || undefined
                  : undefined
            }
            onClick={
              link.label === "Shopping Cart"
                ? onCartClick
                : link.label === "Wishlist"
                  ? onWishlistClick
                  : undefined
            }
          >
            <link.icon />
          </NavLink>
        ),
      )}
    </div>
  );
};

export default IconLinks;
