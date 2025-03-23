import { Icons } from "../../utils/Icons.tsx";
import { Heading, Button } from "../../utils";
import styles from "../../styles/components/common/Overlay.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";

type Props<T> = {
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
  content: T[];
  renderContent: (item: T) => React.ReactNode;
  getContentKey: (item: T) => string | number;
  onRemove: (item: T) => void;
};

export function Overlay<T>({
  isOpen,
  onClose,
  title,
  onClear,
  clearIcon = "Bagx",
  onRemove,
  showSubtotal = true,
  subtotalAmount = 0,
  actionButtons,
  content,
  renderContent,
  getContentKey,
}: Props<T>) {
  const ClearIcon = Icons[clearIcon];
  const hasContent = content && content.length > 0;

  return (
    <>
      <div className={clsx({ [styles.open]: isOpen })}>
        <Button
          className={styles.backdrop}
          onClick={onClose}
          onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) =>
            e.key === "Escape" && onClose()
          }
          aria-label="Close overlay"
        />
        <div className={styles.overlay}>
          <div className={styles.content}>
            <div className={styles.header}>
              <Heading as="h2" size="text2xl">
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
              {hasContent ? (
                <ul className={styles.itemsList}>
                  {content.map((item) => (
                    <li key={getContentKey(item)}>
                      {renderContent(item)}
                      <Button
                        className={styles.removeButton}
                        onClick={() => onRemove(item)}
                      >
                        <Icons.XFill />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <Heading as="p" size="textxl" className={styles.emptyCart}>
                  Your {title.toLowerCase()} is empty
                </Heading>
              )}
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
                  onClick={onClose}
                >
                  <Heading as="span" size="textxxs">
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
      </div>
    </>
  );
}
