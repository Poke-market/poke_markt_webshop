import React from "react";
import styles from "../../styles/components/common/Header.module.scss";
import clsx from "clsx";

type HamburgerButtonProps = {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
};

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onClick,
  className,
}) => {
  return (
    <button
      className={clsx(styles.hamburger, className)}
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default HamburgerButton;
