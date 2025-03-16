import Button from "./Button.tsx";
import styles from "../../styles/components/common/Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
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
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={`page-${index + 1}`}
          className={`${styles.button} ${currentPage === index + 1 ? styles.active : ""}`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
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
