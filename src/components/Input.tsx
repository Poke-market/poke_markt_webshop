import { forwardRef } from "react";
import styles from "../scss/components/Input.module.scss";

type Props = {
  className?: string;
  placeholder?: string;
  variant?: "underline" | "fill";
  size?: "sm" | "md" | "xs";
  shape?: "square" | "round";
  type?: "text" | "email" | "password" | "number";
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      className = "",
      variant = "fill",
      size = "xs",
      shape = "square",
      ...props
    },
    ref,
  ) => {
    const variantClass = styles[variant];
    const sizeClass = styles[size];
    const shapeClass = styles[shape];

    return (
      <input
        ref={ref}
        className={`${styles.input} ${variantClass} ${sizeClass} ${shapeClass} ${className}`}
        {...props}
      />
    );
  },
);

export default Input;
