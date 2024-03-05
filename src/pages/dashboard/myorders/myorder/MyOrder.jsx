import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./MyOrder.module.scss";

function MyOrder({ order }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  function getPurchaseTypeName(purchaseType) {
    const types = {
      0: "Instant Purchase",
      1: "Financing",
    };
  
    return types[purchaseType] || "Unbekannter Typ";
  }

  return (
    <div className={`${styles.MyOrder} ${showDetails ? styles.clicked : ""}`}>
      <span className={styles.title} onClick={toggleDetails}>
        {order.orderName}
        <FontAwesomeIcon className={styles.fa} icon={faBars} />
      </span>
      <div
        className={`${styles.details__container} ${
          showDetails ? styles.active : ""
        }`}
      >
        <div className={styles.info__container}>
          <span>Date: {new Date(order.orderDate).toLocaleDateString()}</span>
          <span>Purchase Type: {getPurchaseTypeName(order.purchaseType)}</span>
        </div>
        {order.purchaseType === 0 && (
          <div className={styles.info__container}>
            <span>Price: {order.cashPurchasePrice}€</span>
          </div>
        )}
        {order.purchaseType === 1 && (
          <>
            <div className={styles.info__container}>
              <span>Monthly Rate: {order.monthlyRate}€</span>
              <span>Term (Months): {order.term}</span>
            </div>
            <div className={styles.info__container}>
              <span>Final Price: {order.finalPrice}€</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyOrder;
