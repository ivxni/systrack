import React, { useState } from "react";
import axios from "axios";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./Personal.module.scss";

function Personal() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
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
    if (!token) {
      setError("Kein Token gefunden. Bitte erneut einloggen.");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `https://systrack-its.azurewebsites.net/api/user/personal`,
        { ...formData, dob: formData.dob || null },
        config
      );
      alert("Speichern erfolgreich");
      window.location.reload(); 
    } catch (error) {
      console.error(
        "Fehler beim Speichern der persönlichen Daten:",
        error.response || error
      );
      setError(
        "Fehler beim Speichern der persönlichen Daten. Bitte versuchen Sie es später erneut."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.Personal} onSubmit={handleSubmit}>
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

export default Personal;
