import styles from "./Footer.module.scss";
import Logo from "../../assets/img/logo.png";

function Footer() {
  return (
    <footer className={styles}>
      <div className={styles.footer__menu}>
        <div className={styles.footer__menu__container}>
          <img src={Logo} alt="sysTrack"></img>
        </div>
        <span></span>
      </div>
      <span>©2023 sysTrack</span>
    </footer>
  );
}

export default Footer;
