import { Button, Heading } from "../../utils";
import styles from "../../scss/components/filters/FilterOverlay.module.scss";
import FilterForm from "./FilterForm.tsx";
import clsx from "clsx";

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterOverlay = ({ isOpen, onClose }: FilterOverlayProps) => {
  return (
    <>
      <div className={clsx({ [styles.open]: isOpen })}>
        <Button
          className={styles.backdrop}
          onClick={onClose}
          onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) =>
            e.key === "Escape" && onClose()
          }
          aria-label="Close cart"
        />
        <div className={styles.overlay}>
          <FilterForm />
          <div className={styles.bottomSection}>
            <hr />
            <Button className={styles.closeButtonMobile} onClick={onClose}>
              <Heading as="span" size="textxs">
                Close
              </Heading>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
