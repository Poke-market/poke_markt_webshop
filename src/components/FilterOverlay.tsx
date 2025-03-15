import { Button } from "../utils";
import styles from "../scss/components/FilterOverlay.module.scss";

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterOverlay = ({ isOpen, onClose }: FilterOverlayProps) => {
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
      <div className={styles.overlay}></div>
    </>
  );
};
