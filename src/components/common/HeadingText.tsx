import { typographySizes } from "../../config";
import styles from "../../styles/abstracts/typography.module.scss";

type Props = {
  className?: string;
  // HTML element to render AS
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "a" | "span";
  size?: keyof typeof typographySizes;
  title?: string;
  children?: any;
};

// heading text component with customizable size and element
const HeadingText = ({
  className = "text",
  size = "textlg",
  as: Component = "p",
  ...restProps
}: Props) => {
  return (
    <Component
      className={`${styles.text} ${styles[typographySizes[size]]} ${className}`}
      {...restProps}
    >
      {restProps.children}
    </Component>
  );
};

export const Heading = HeadingText;
export const Text = HeadingText;
export default HeadingText;
