import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: React.ReactNode;
  cursor?: "pointer" | "not-allowed";
};

const Button = ({ children, className = "", ...props }: ButtonProps) => (
  <button className={className} {...props}>
    {children}
  </button>
);

export default Button;
