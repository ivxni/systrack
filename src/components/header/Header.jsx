import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import Logo from "../../assets/img/logo.png";

function Header() {

  return (
    <div>
      <header className={styles}>
        <Link to={"/"}>
          <div className={styles.logo}>
            <img src={Logo} alt="sysTrack" />
            <h1>sysTrack</h1>
          </div>
        </Link>
      </header>
    </div>
  );
}

export default Header;
