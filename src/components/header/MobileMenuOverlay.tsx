import React, { ReactNode } from "react";
import styles from "../../styles/components/header/Header.module.scss";
import clsx from "clsx";

type MobileMenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  logo: ReactNode;
  navLinks: ReactNode;
  iconLinks: ReactNode;
  closeButtonText?: string;
};

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({
  isOpen,
  onClose,
  logo,
  navLinks,
  iconLinks,
  closeButtonText = "Close",
}) => {
  return (
    <div
      className={clsx(styles.mobileOverlay, {
        [styles.open]: isOpen,
      })}
    >
      <div className={styles.mobileMenuContent}>
        {logo}
        {navLinks}
        {iconLinks}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close menu"
        >
          {closeButtonText}
        </button>
      </div>
      <div
        className={styles.backdrop}
        onClick={onClose}
        role="button"
        tabIndex={0}
      ></div>
    </div>
  );
};

export default MobileMenuOverlay;
