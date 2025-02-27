import styles from "../scss/components/BannerShop.module.css";
import Heading from "./Headingtxt";
import { Link } from "react-router-dom";

type Props = {
  title?: string;
  className?: string;
};

export default function BannerShop({ title = "Shop" }: Props) {
  return (
    <div className={styles.bannerShop}>
      <img
        src="/pokemart.jpeg"
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
        <Heading as="span"> ﹥ </Heading>
        <Heading as="span">
          <Link to="/">{title}</Link>
        </Heading>
      </div>
    </div>
  );
}
