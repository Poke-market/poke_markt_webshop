import { ButtonProps } from "../types/types.ts";
import styles from "../scss/components/Pagination.module.scss";

const Button = ({ className = "", children, ...props }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
