import React from "react";
import { typographySizes } from "../utils/typographySizes.ts";
import styles from "../scss/abstracts/typography.module.scss";

type Props = {
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "a";
  size?: keyof typeof typographySizes;
  title?: string;
  children?: React.ReactNode;
};

const Heading = ({
  className = "text",
  size = "textlg",
  as: Component = "p",
  ...restProps
}: Props) => {
  return (
    <Component
      className={`${styles.text} ${styles[typographySizes[size]]} ${className}`}
      {...restProps}
    ></Component>
  );
};

export default Heading;
