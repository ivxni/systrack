import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Computer.module.scss";

function MyComputer({ computer, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  const deleteComputer = () => {
    const isConfirmed = window.confirm("Delete computer?");
    if (isConfirmed) {
      onDelete(computer.computerId);
    }
  };

  return (
    <div
      className={`${styles.Computer} ${showDetails ? styles.clicked : ""}`}
    >
      <span className={styles.title} onClick={toggleDetails}>
      Computer-ID {computer.computerId} / {computer.computerName} / {computer.user.email}
      <div className={styles.actions}>
          <FontAwesomeIcon
            className={styles.fa}
            icon="xmark"
            onClick={deleteComputer}
          />
          <FontAwesomeIcon className={styles.fa} icon="bars" />
        </div>
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
