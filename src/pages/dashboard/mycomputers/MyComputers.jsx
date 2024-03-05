import React, { useEffect, useState } from "react";
import axios from "axios";
import MyComputer from "./mycomputer/MyComputer";
import styles from "./MyComputers.module.scss";

function MyComputers() {
  const [computers, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const userId = localStorage.getItem("userId");

        const response = await axios.get(
          `https://systrack-its.azurewebsites.net/api/user/${userId}/computers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const computersData = response.data.$values || [];
        setOrders(computersData);
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
    <div className={styles.MyComputers}>
      <h1>My Computers</h1>
      {computers.length > 0 ? (
        <div className={styles.section__container}>
          {computers.map((computer) => (
            <div key={computer.computerId} className={styles.info__container}>
              <MyComputer computer={computer} />
            </div>
          ))}
        </div>
      ) : (
        <p>No Computers found.</p>
      )}
    </div>
  );
}

export default MyComputers;
