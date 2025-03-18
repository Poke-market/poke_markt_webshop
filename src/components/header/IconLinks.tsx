import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { headerLinks } from "../../config";
import styles from "../../styles/components/common/Header.module.scss";

type IconLinksProps = {
  onCartClick: (e: React.MouseEvent) => void;
  onProfileClick: (e: React.MouseEvent) => void;
  onWishlistClick: (e: React.MouseEvent) => void;
};

const IconLinks = ({
  onCartClick,
  onProfileClick,
  onWishlistClick,
}: IconLinksProps) => (
  <div className={styles.iconContainer}>
    {headerLinks.iconLinks.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        aria-label={link.label}
        className={({ isActive }) => clsx(isActive && styles.active)}
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

export default IconLinks;
