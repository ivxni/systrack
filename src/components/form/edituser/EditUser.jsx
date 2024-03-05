import React, { useState } from "react";
import axios from "axios";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./EditUser.module.scss";

function EditUser({ userData, onClose }) {
  const [formData, setFormData] = useState({
    firstName: userData?.customer?.firstName || "",
    lastName: userData?.customer?.lastName || "",
    dob: userData?.customer?.dob || "",
    country: userData?.customer?.country || "",
    city: userData?.customer?.city || "",
    zip: userData?.customer?.zip || "",
    street: userData?.customer?.street || "",
    streetNo: userData?.customer?.streetNo || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("jwtToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const userId = userData.id;

    try {
      await axios.put(
        `https://systrack-its.azurewebsites.net/api/user/personal/${userId}`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: formData.dob,
        },
        config
      );

      await axios.put(
        `https://systrack-its.azurewebsites.net/api/user/address/${userId}`,
        {
          country: formData.country,
          city: formData.city,
          zip: formData.zip,
          street: formData.street,
          streetNo: formData.streetNo,
        },
        config
      );

      alert("Speichern erfolgreich");
      if (typeof onClose === "function") {
        onClose();
      }
      window.location.reload();
    } catch (error) {
      console.error(
        "Fehler beim Speichern der Benutzerdaten:",
        error.response || error
      );
      setError("Fehler beim Speichern. Bitte versuchen Sie es später erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.EditUser} onSubmit={handleSubmit}>
      {error && <p className={styles.Error}>{error}</p>}
      <div className={styles.Input__Container}>
        <Input
          name="firstName"
          placeholder="Firstname"
          type="text"
          onChange={handleChange}
          value={formData.firstName}
        />
        <Input
          name="lastName"
          placeholder="Lastname"
          type="text"
          onChange={handleChange}
          value={formData.lastName}
        />
        <Input
          name="dob"
          placeholder="Date of Birth"
          type="date"
          onChange={handleChange}
          value={formData.dob}
        />
        <Input
          name="country"
          placeholder="Country"
          onChange={handleChange}
          value={formData.country}
        />
        <Input
          name="city"
          placeholder="City"
          onChange={handleChange}
          value={formData.city}
        />
        <Input
          name="zip"
          placeholder="ZIP / Postal Code"
          onChange={handleChange}
          value={formData.zip}
        />
        <Input
          name="street"
          placeholder="Street"
          onChange={handleChange}
          value={formData.street}
        />
        <Input
          name="streetNo"
          placeholder="Street No."
          onChange={handleChange}
          value={formData.streetNo}
        />
      </div>
      <div className={styles.Button__Container}>
        <Button
          variant="secondary"
          label={loading ? "Speichern..." : "Save Changes"}
          type="submit"
          disabled={loading}
        />
      </div>
    </form>
  );
}

export default EditUser;
