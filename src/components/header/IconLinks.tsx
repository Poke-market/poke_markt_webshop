import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { headerLinks } from "../../config";
import styles from "../../styles/components/common/Header.module.scss";
import ProfileDropdown from "./ProfileDropdown";

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
  return (
    <div className={styles.iconContainer}>
      {headerLinks.iconLinks.map((link) =>
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
