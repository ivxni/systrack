import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./Computer.module.scss";

function MyComputer({ computer }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
      className={`${styles.Computer} ${showDetails ? styles.clicked : ""}`}
    >
      <span className={styles.title} onClick={toggleDetails}>
      Computer-ID {computer.computerId} / {computer.computerName} / {computer.user.email}
        <FontAwesomeIcon className={styles.fa} icon={faBars} />
      </span>
      <div
        className={`${styles.details__container} ${
          showDetails ? styles.active : ""
        }`}
      >
        <div className={styles.info__container}>
          <span>RAM: {computer.ram}GB</span>
          <span>CPU: {computer.cpu}Ghz</span>
        </div>
        <div className={styles.info__container}>
          <span>MAC: {computer.mac}</span>
        </div>
      </div>
    </div>
  );
}

export default MyComputer;
