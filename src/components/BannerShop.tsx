import styles from "../scss/components/BannerShop.module.css";

const BannerShop = () => {
  return (
    <div className={styles.bannerShop}>
      <img
        src="/pokemart.jpeg"
        alt="Shop Banner"
        className={styles.bannerImage}
      ></img>
      <h1>Shop</h1>
      <div className={styles.breadcrumb}>
        <span>Home</span>
        <span> ﹥ </span>
        <span>Shop</span>
      </div>
    </div>
  );
};
export default BannerShop;
