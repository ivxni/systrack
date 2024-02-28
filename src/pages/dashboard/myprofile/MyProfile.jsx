import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyProfile.module.scss";
import Button from "../../../components/button/Button";
import Form from "../../../components/form/Form";

function MyProfile() {
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    country: "",
    city: "",
    zip: "",
    street: "",
    streetNo: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("jwtToken");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        console.error("Token oder Benutzer-ID fehlt");
        return;
      }

      try {
        const response = await axios.get(
          `https://systrack-its.azurewebsites.net/api/user/data/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          dob: response.data.dob,
          country: response.data.country,
          city: response.data.city,
          zip: response.data.zip,
          street: response.data.street,
          streetNo: response.data.streetNo,
        });
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten", error);
      }
    };

    fetchUserData();
  }, []);

  const togglePersonalForm = () => {
    setShowPersonalForm(!showPersonalForm);
  };

  const toggleAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };

  return (
    <div className={styles.MyProfile}>
      <h1>My Profile</h1>
      <div className={styles.section__container}>
        <div className={styles.info__container}>
          <h2>Personal Data</h2>
          <span>{userData.firstName || "Firstname"}</span>
          <span>{userData.lastName || "Lastname"}</span>
          <span>{userData.dob || "TT.MM.YYYY"}</span>{" "}
          <Button
            variant="secondary"
            label="Edit"
            onClick={togglePersonalForm}
          />
          {showPersonalForm && (
            <Form label="Personal Data" onClose={togglePersonalForm} />
          )}
        </div>
        <div className={styles.info__container}>
          <h2>Address</h2>
          <span>{userData.country || "Country"}</span>
          <span>{userData.city || "City"}</span>
          <span>{userData.zip || "ZIP / Postal Code"}</span>
          <span>{userData.street || "Street"}</span>
          <span>{userData.streetNo || "Street No."}</span>
          <Button
            variant="secondary"
            label="Edit"
            onClick={toggleAddressForm}
          />
          {showAddressForm && (
            <Form label="Address" onClose={toggleAddressForm} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
