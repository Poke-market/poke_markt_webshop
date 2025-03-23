import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { headerLinks } from "../../config";
import styles from "../../styles/components/common/Header.module.scss";
import { useAppSelector } from "../../store";
import { selectCartItemCount } from "../../store/cartSlice";

type IconLinksProps = {
  onCartClick: (e: React.MouseEvent) => void;
  onProfileClick: (e: React.MouseEvent) => void;
  onWishlistClick: (e: React.MouseEvent) => void;
};

const IconLinks = ({
  onCartClick,
  onProfileClick,
  onWishlistClick,
}: IconLinksProps) => {
  const cartItemCount = useAppSelector(selectCartItemCount);

  return (
    <div className={styles.iconContainer}>
      {headerLinks.iconLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          aria-label={link.label}
          className={({ isActive }) => clsx(isActive && styles.active)}
          data-cart-item-count={
            link.label === "Shopping Cart"
              ? cartItemCount || undefined
              : undefined
          }
          onClick={
            link.label === "Shopping Cart"
              ? onCartClick
              : link.label === "Profile"
                ? onProfileClick
                : link.label === "Wishlist"
                  ? onWishlistClick
                  : undefined
          }
        >
          <link.icon />
        </NavLink>
      ))}
    </div>
  );
};

export default IconLinks;
