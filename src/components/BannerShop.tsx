import styles from "../scss/components/BannerShop.module.css";
import Headingtxt from "./Headingtxt.tsx";

const BannerShop = () => {
  return (
    <div className={styles.bannerShop}>
      <img
        src="/pokemart.jpeg"
        alt="Shop Banner"
        className={styles.bannerImage}
      ></img>
      <Headingtxt className={styles.heading}>Shop</Headingtxt>
      <div className={styles.breadcrumb}>
        <span>Home</span>
        <span> ﹥ </span>
        <span>Shop</span>
      </div>
    </div>
  );
};
export default BannerShop;
