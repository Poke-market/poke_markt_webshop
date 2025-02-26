import styles from "../scss/components/Pagination.module.scss";

export type Props = React.ComponentProps<"button"> & {
  color?: string;
  size?: string;
  variant?: string;
  width?: string;
  height?: string;
};

const Button = ({ className = "", children, ...props }: Props) => {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
