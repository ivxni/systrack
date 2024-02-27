import styles from "./NotFound.module.scss";

function NotFound() {
  return (
    <div className={styles.notfound}>
      <h1>404</h1>
      <span>Page Not Found</span>
    </div>
  );
}

export default NotFound;
