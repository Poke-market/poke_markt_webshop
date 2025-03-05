import styles from "../scss/components/Pagination.module.scss";

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
};

const Button = ({ children, ...props }: Props) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
