import styles from "../../styles/components/common/Pagination.module.scss";
type CursorType = "pointer" | "not-allowed";
export type Props = {
  color?: string;
  size?: string;
  variant?: string;
  width?: string;
  height?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  cursor?: CursorType;
};
const Button = ({ children, cursor = "pointer", ...props }: Props) => {
  return (
    <button className={styles.button} style={{ cursor: cursor }} {...props}>
      {children}
    </button>
  );
};
export default Button;
