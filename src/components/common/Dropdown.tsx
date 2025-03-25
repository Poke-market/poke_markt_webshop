import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "../../styles/components/common/Dropdown.module.scss";

interface WithOnClose {
  onClose?: () => void;
}

type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactElement<WithOnClose>; // The content to show when dropdown is open
  className?: string;
  triggerClassName?: string;
  closeOnMobileOnly?: boolean;
};

/**
 * A reusable Dropdown component that shows/hides content on hover (desktop) or click (mobile)
 */
const Dropdown = ({
  trigger,
  children,
  className,
  triggerClassName,
  closeOnMobileOnly = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  // Mobile breakpoint (576px) for responsive behavior
  const isMobile = () => window.innerWidth <= 975;

  // Clean up any existing timeout to prevent memory leaks
  const clearTimeoutRef = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Show dropdown on hover, but only for desktop
  const handleMouseEnter = () => {
    if (!isMobile()) {
      clearTimeoutRef();
      setIsOpen(true);
    }
  };

  // Hide dropdown after a small delay on desktop
  const handleMouseLeave = () => {
    if (!isMobile()) {
      clearTimeoutRef();
      timeoutRef.current = window.setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  };

  // Toggle dropdown on click, but only for mobile
  const handleTriggerClick = () => {
    if (isMobile()) {
      setIsOpen((prev) => !prev);
    }
  };

  // Close dropdown, respecting the closeOnMobileOnly prop
  const handleClose = () => {
    if (closeOnMobileOnly && !isMobile()) return;
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clean up timeout when component unmounts
  useEffect(() => {
    return () => clearTimeoutRef();
  }, []);

  return (
    <div
      className={clsx(styles.dropdown, className)}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger element that controls the dropdown */}
      <div
        className={clsx(styles.trigger, triggerClassName)}
        onClick={handleTriggerClick}
      >
        {trigger}
      </div>

      {/* Dropdown content, only shown when isOpen is true */}
      {isOpen && (
        <div className={clsx(styles.content, { [styles.open]: isOpen })}>
          {React.cloneElement(children, { onClose: handleClose })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
