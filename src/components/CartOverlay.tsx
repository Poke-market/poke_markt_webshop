import { Icons } from "../utils/Icons";
import { Heading, Button } from "../utils";
import styles from "../scss/components/CartOverlay.module.scss";
import { Link } from "react-router-dom";

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartOverlay = ({ isOpen, onClose }: CartOverlayProps) => {
  if (!isOpen) return null;

  return (
    <>
      <Button
        className={styles.backdrop}
        onClick={onClose}
        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) =>
          e.key === "Escape" && onClose()
        }
        aria-label="Close cart"
      />
      <div className={styles.overlay}>
        <div className={styles.cartContent}>
          <div className={styles.header}>
            <Heading as="h2" size="textxl">
              Shopping Cart
            </Heading>
            <Button className={styles.closeButton} onClick={onClose}>
              <Icons.Bagx />
            </Button>
          </div>
          <div className={styles.headerDivider} />
          <div className={styles.itemsContainer}>
            <Heading as="p" size="textxl" className={styles.emptyCart}>
              Your cart is empty
            </Heading>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.footer}>
            <div className={styles.total}>
              <Heading as="span" size="textlg">
                Subtotal
              </Heading>
              <Heading as="span" size="textlg">
                $0.00
              </Heading>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.actionButtons}>
            <Link to="/cart" className={styles.actionButton}>
              <Heading as="span" size="textxs">
                Cart
              </Heading>
            </Link>
            <Link to="/checkout" className={styles.actionButton}>
              <Heading as="span" size="textxs">
                Checkout
              </Heading>
            </Link>
            <Link to="/comparison" className={styles.actionButton}>
              <Heading as="span" size="textxs">
                Comparison
              </Heading>
            </Link>
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
