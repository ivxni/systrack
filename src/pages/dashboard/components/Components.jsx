import styles from "./Components.module.scss";
import Computer from "./component/Component";

function Components() {
  return (
    <div className={styles.Components}>
      <h1>Components</h1>
      <div className={styles.section__container}>
        <div className={styles.info__container}>
          <Computer/>
        </div>
      </div>
    </div>
  );
}

export default Components;
