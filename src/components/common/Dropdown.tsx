import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "../../styles/components/common/Dropdown.module.scss";

interface WithOnClose {
  onClose?: () => void;
}

type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactElement<WithOnClose>;
  className?: string;
  triggerClassName?: string;
  closeOnMobileOnly?: boolean;
};

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

  const clearTimeoutRef = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (window.innerWidth > 576) {
      clearTimeoutRef();
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 576) {
      clearTimeoutRef();
      timeoutRef.current = window.setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  };

  const handleClose = () => {
    if (closeOnMobileOnly && window.innerWidth > 576) {
      return;
    }
    setIsOpen(false);
  };

  const handleTriggerClick = () => {
    if (window.innerWidth <= 576) {
      setIsOpen(!isOpen);
    }
  };

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
      <div
        className={clsx(styles.trigger, triggerClassName)}
        onClick={handleTriggerClick}
      >
        {trigger}
      </div>
      {isOpen && (
        <div className={clsx(styles.content, { [styles.open]: isOpen })}>
          {React.cloneElement(children, { onClose: handleClose })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
