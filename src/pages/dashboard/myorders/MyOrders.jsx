import React, { useEffect, useState } from "react";
import axios from "axios";
import MyOrder from "./myorder/MyOrder";
import styles from "./MyOrders.module.scss";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const userId = localStorage.getItem("userId");

        const response = await axios.get(
          `https://systrack-its.azurewebsites.net/api/user/${userId}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        const ordersData = response.data.$values || [];
        setOrders(ordersData);
      } catch (error) {
        console.error(
          "Fehler beim Abrufen der Bestellungen:",
          error.response || error
        );
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={styles.MyOrders}>
      <h1>My Orders</h1>
      {orders.length > 0 ? (
        <div className={styles.section__container}>
        {orders.map((order) => (
          <div key={order.orderId} className={styles.info__container}>
            <MyOrder order={order} />
          </div>
        ))}
      </div>
      ) : (
        <p>No Orders found.</p>
      )}
    </div>
  );
}

export default MyOrders;
