import { Button, Heading } from "../common";
import styles from "../../styles/components/filters/FilterOverlay.module.scss";
import FilterForm from "./FilterForm.tsx";
import clsx from "clsx";

type FilterOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const FilterOverlay = ({ isOpen, onClose }: FilterOverlayProps) => {
  return (
    <>
      <div className={clsx({ [styles.open]: isOpen })}>
        <div
          className={styles.backdrop}
          onClick={onClose}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
            e.key === "Escape" && onClose()
          }
          role="button"
          tabIndex={0}
          aria-label="Close Filter"
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
