import Button from "./Button.tsx";
import styles from "../../styles/components/common/Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  maxDisplayedPages?: number;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxDisplayedPages = 3,
}: PaginationProps) => {
  let pagesFrom = Math.max(
    1,
    currentPage - Math.floor((maxDisplayedPages - 1) / 2),
  );
  const pagesTo = Math.min(totalPages, pagesFrom + maxDisplayedPages - 1);
  pagesFrom = Math.max(1, pagesTo - maxDisplayedPages + 1); // intentional re-adjustment

  const pages = Array(pagesTo - pagesFrom + 1)
    .fill(0)
    .map((_, index) => pagesFrom + index);

  return (
    <div className={styles.buttonContainer}>
      {currentPage > 1 && (
        <Button
          className={`${styles.button} ${styles.next}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
      )}
      {pages.map((page) => (
        <Button
          key={`page-${page}`}
          className={`${styles.button} ${currentPage === page ? styles.active : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      {currentPage < totalPages && (
        <Button
          className={`${styles.button} ${styles.next}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;
