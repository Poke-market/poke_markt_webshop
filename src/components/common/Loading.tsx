import styles from "../../styles/components/common/Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.pokeball}>
        <div className={styles.pokeballTop} />
        <div className={styles.pokeballBottom} />
        <div className={styles.pokeballCenter} />
      </div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default Loading;
