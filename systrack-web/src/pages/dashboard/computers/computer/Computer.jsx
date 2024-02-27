import styles from "./Computer.module.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faBars);

function Computer() {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div className={`${styles.Computer} ${showDetails ? styles.clicked : ""}`}>
      <span className={styles.title} onClick={toggleDetails}>
        ComputerName
        <FontAwesomeIcon className={styles.fa} icon="bars" />
      </span>
      <div
        className={`${styles.details__container} ${
          showDetails ? styles.active : ""
        }`}
      >
        <div className={styles.info__container}>
          <span>Computer:</span>
          <span>Customer:</span>
        </div>
        <div className={styles.info__container}>
          <span>CPU:</span>
          <span>RAM:</span>
        </div>
        <div className={styles.info__container}>
          <span>Delivery Date:</span>
          <span>Payment:</span>
        </div>
        <div className={styles.info__container}>
          <span>Price:</span>
          <span>MAC:</span>
        </div>
      </div>
    </div>
  );
}

export default Computer;
