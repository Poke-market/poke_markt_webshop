import styles from "../../styles/components/common/PageBanner.module.scss";
import { Link } from "react-router-dom";
import { Icons } from "../../utils";
import Heading from "./HeadingText";

type Props = {
  title?: string;
  className?: string;
};

export default function PageBanner({ title = "shop" }: Props) {
  return (
    <div className={styles.bannerShop}>
      <div className={styles.backgroundImage} />
      <div className={styles.overlay} />

      <Heading as="h1" className={styles.heading}>
        {title}
      </Heading>
      <div className={styles.breadcrumb}>
        <Heading as="span">
          <Link to="/">Home</Link>
        </Heading>
        <Heading as="span">
          <Icons.Arrowrightsmall />
        </Heading>
        <Heading as="span">
          <Link to="/">{title}</Link>
        </Heading>
      </div>
    </div>
  );
}
