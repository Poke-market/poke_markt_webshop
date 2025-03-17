import styles from "../../styles/components/common/PageBanner.module.scss";
import { Link } from "react-router-dom";
import { Icons } from "../../utils";
import Heading from "./HeadingText";

type Props = {
  title?: string;
  className?: string;
};

export default function PageBanner({ title = "Shop" }: Props) {
  return (
    <div className={styles.bannerShop}>
      <img
        src="/src/assets/images/pokemart.jpeg"
        alt="Shop Banner"
        className={styles.bannerImage}
      />
      <Heading as="h1" className={styles.heading}>
        {title}
      </Heading>
      <div className={styles.breadcrumb}>
        <span>
          <Link to="/">Home</Link>
        </span>
        <span>
          <Icons.Arrowrightsmall />
        </span>
        <span>
          <Link to="/">{title}</Link>
        </span>
      </div>
    </div>
  );
}
