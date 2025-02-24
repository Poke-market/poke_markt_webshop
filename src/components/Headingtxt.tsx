import { HeadFootProps } from "../types/types.ts";
import { typographySizes } from "../utils/typographySizes.ts";
import styles from "../scss/abstracts/typography.module.scss";

const Heading: React.FunctionComponent<HeadFootProps> = ({
  children,
  className = "text",
  size = "textlg",
  as: Component = "p",
  ...restProps
}) => {
  return (
    <Component
      className={`${styles.text} ${styles[typographySizes[size]]} ${className}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export default Heading;
