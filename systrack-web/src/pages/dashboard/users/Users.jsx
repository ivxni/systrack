import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Users.module.scss";
import User from "./user/User";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const usersResponse = await axios.get(
          "https://localhost:7167/api/user",
          config
        );

        const userData = usersResponse.data.$values;

        if (Array.isArray(userData)) {
          const usersWithDetails = await Promise.all(
            userData.map(async (user) => {
              try {
                const personalDataResponse = await axios.get(
                  `https://localhost:7167/api/user/data/${user.id}`,
                  config
                );
                return { ...user, customer: personalDataResponse.data };
              } catch (error) {
                console.error(
                  "Fehler beim Abrufen der Benutzerdetails: ",
                  error
                );
                return user;
              }
            })
          );
          setUsers(usersWithDetails);
        } else {
          console.error("Fehler: Die Antwort enthält kein Array.");
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzer: ", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.Users}>
      <h1>Users</h1>
      <div className={styles.section__container}>
        {users.map((user) => (
          <div key={user.id} className={styles.info__container}>
            <User userData={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
