import styles from "./User.module.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faBars);

function getRoleName(roleNumber) {
  const roleNames = {
    0: "Customer",
    1: "Specialist",
    2: "Staff",
    3: "Admin",
  };

  return roleNames[roleNumber] || "Unbekannte Rolle";
}

function User({ userData }) {
  const [showDetails, setShowDetails] = useState(false);

  const { customer } = userData;
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const roleName = getRoleName(userData.role);

  return (
    <div className={`${styles.User} ${showDetails ? styles.clicked : ""}`}>
      <span className={styles.title} onClick={toggleDetails}>
        {userData.email} | {roleName}
        <FontAwesomeIcon className={styles.fa} icon="bars" />
      </span>
      <div
        className={`${styles.details__container} ${
          showDetails ? styles.active : ""
        }`}
      >
        <div className={styles.info__container}>
          <span>First Name: {customer?.firstName}</span>
          <span>Last Name: {customer?.lastName}</span>
        </div>
        <div className={styles.info__container}>
          <span>Date of Birth: {customer?.dob}</span>
          <span>Country: {customer?.country}</span>
        </div>
        <div className={styles.info__container}>
          <span>City: {customer?.city}</span>
          <span>Postal Code: {customer?.zip}</span>
        </div>
        <div className={styles.info__container}>
          <span>Street: {customer?.street}</span>
          <span>Street Number: {customer?.streetNo}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
