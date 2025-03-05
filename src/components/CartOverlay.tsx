import { Icons } from "../utils/Icons";
import { Heading } from "../utils";
import styles from "../scss/components/CartOverlay.module.scss";

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartOverlay = ({ isOpen, onClose }: CartOverlayProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.overlay}>
        <div className={styles.cartContent}>
          <div className={styles.header}>
            <Heading as="h2" size="textxl">
              Shopping Cart
            </Heading>
            <button className={styles.closeButton} onClick={onClose}>
              <Icons.Bagx />
            </button>
          </div>

          <div className={styles.itemsContainer}>
            <Heading as="p" size="textxl" className={styles.emptyCart}>
              Your cart is empty
            </Heading>
          </div>

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
            <button className={styles.actionButton}>
              <Heading as="span" size="textxs">
                Cart
              </Heading>
            </button>
            <button className={styles.actionButton}>
              <Heading as="span" size="textxs">
                Checkout
              </Heading>
            </button>
            <button className={styles.actionButton}>
              <Heading as="span" size="textxs">
                Comparison
              </Heading>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
