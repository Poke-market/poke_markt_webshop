import { ButtonHTMLAttributes } from "react";
import styles from "../../styles/components/common/Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: React.ReactNode;
  cursor?: "pointer" | "not-allowed";
};

const Button = ({
  children,
  className = "",
  cursor = "pointer",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      style={{ cursor }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
