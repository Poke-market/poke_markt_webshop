import styles from "../../styles/components/common/PageBanner.module.scss";
import Heading from "./Headingtxt.tsx";
import { Link } from "react-router-dom";
import { Icons } from "../../utils/Icons.tsx";

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
