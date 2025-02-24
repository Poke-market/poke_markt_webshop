import { ButtonProps } from "../types/types.ts";

const Button = ({
  color = "",
  size = "",
  variant = "",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={`${className} ${color} ${size} ${variant}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
