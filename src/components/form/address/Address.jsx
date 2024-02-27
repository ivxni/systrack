import React, { useState } from "react";
import axios from "axios";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./Address.module.scss";

function Address() {
  const [addressData, setAddressData] = useState({
    country: "",
    city: "",
    zip: "",
    street: "",
    streetNo: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
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
        `https://localhost:7167/api/user/address`,
        addressData,
        config
      );
      alert("Adressdaten erfolgreich gespeichert.");
      window.location.reload(); 
    } catch (error) {
      console.error(
        "Fehler beim Speichern der Adressdaten:",
        error.response || error
      );
      setError(
        "Fehler beim Speichern der Adressdaten. Bitte versuchen Sie es später erneut."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.Address} onSubmit={handleSubmit}>
      {error && <p className={styles.Error}>{error}</p>}
      <div className={styles.Input__Container}>
        <Input
          name="country"
          placeholder="Country"
          onChange={handleChange}
          value={addressData.country}
        />
        <Input
          name="city"
          placeholder="City"
          onChange={handleChange}
          value={addressData.city}
        />
        <Input
          name="zip"
          placeholder="ZIP / Postal Code"
          onChange={handleChange}
          value={addressData.zip}
        />
        <Input
          name="street"
          placeholder="Street"
          onChange={handleChange}
          value={addressData.street}
        />
        <Input
          name="streetNo"
          placeholder="Street No."
          onChange={handleChange}
          value={addressData.streetNo}
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

export default Address;
