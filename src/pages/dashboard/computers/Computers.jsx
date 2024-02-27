import styles from "./Computers.module.scss";
import Computer from "./computer/Computer";

function Computers() {
  return (
    <div className={styles.Computers}>
      <h1>Computers</h1>
      <div className={styles.section__container}>
        <div className={styles.info__container}>
          <Computer/>
        </div>
      </div>
    </div>
  );
}

export default Computers;
