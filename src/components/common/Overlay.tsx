import { Icons } from "../../utils/Icons.tsx";
import { Heading, Button } from "../../utils";
import styles from "../../styles/components/cart/CartOverlay.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onClear?: () => void;
  clearIcon?: keyof typeof Icons;
  showSubtotal?: boolean;
  subtotalAmount?: number;
  actionButtons: {
    text: string;
    to: string;
  }[];
};

export const Overlay = ({
  isOpen,
  onClose,
  title,
  onClear,
  clearIcon = "Bagx",
  showSubtotal = true,
  subtotalAmount = 0,
  actionButtons,
}: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const ClearIcon = Icons[clearIcon];

  const handleButtonClick = () => {
    onClose();
  };

  return (
    <>
      <Button
        className={`${styles.backdrop} ${isClosing ? styles.fadeOut : ""}`}
        onClick={onClose}
        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) =>
          e.key === "Escape" && onClose()
        }
        aria-label="Close overlay"
      />
      <div className={`${styles.overlay} ${isClosing ? styles.slideOut : ""}`}>
        <div className={styles.cartContent}>
          <div className={styles.header}>
            <Heading as="h2" size="textxl">
              {title}
            </Heading>
            {onClear && (
              <Button
                className={styles.closeButton}
                onClick={onClear}
                aria-label="Clear items"
              >
                <ClearIcon />
              </Button>
            )}
          </div>
          <div className={styles.headerDivider} />
          <div className={styles.itemsContainer}>
            <Heading as="p" size="textxl" className={styles.emptyCart}>
              Your {title.toLowerCase()} is empty
            </Heading>
          </div>
        </div>
        <div className={styles.bottomSection}>
          {showSubtotal && (
            <>
              <div className={styles.footer}>
                <div className={styles.total}>
                  <Heading as="span" size="textlg">
                    Subtotal
                  </Heading>
                  <Heading as="span" size="textlg">
                    ${subtotalAmount.toFixed(2)}
                  </Heading>
                </div>
              </div>
              <div className={styles.divider} />
            </>
          )}
          {!showSubtotal && <div className={styles.divider} />}
          <div className={styles.actionButtons}>
            {actionButtons.map((button, index) => (
              <Link
                key={index}
                to={button.to}
                className={styles.actionButton}
                onClick={handleButtonClick}
              >
                <Heading as="span" size="textxs">
                  {button.text}
                </Heading>
              </Link>
            ))}
          </div>
          <Button className={styles.closeButtonMobile} onClick={onClose}>
            <Heading as="span" size="textxs">
              Close
            </Heading>
          </Button>
        </div>
      </div>
    </>
  );
};
