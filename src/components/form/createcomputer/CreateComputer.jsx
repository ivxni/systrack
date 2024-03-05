import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./CreateComputer.module.scss";

function CreateComputer({ onClose }) {
  const [users, setUsers] = useState([]);
  const [computerData, setComputerData] = useState({
    userId: "",
    computerName: "",
    ram: "",
    cpu: "",
    mac: "",
  });

  const fetchUsers = async () => {
    const token = localStorage.getItem("jwtToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(
        `https://localhost:7167/api/user`,
        config
      );
      const usersArray = Array.isArray(response.data)
        ? response.data
        : response.data.$values;
      setUsers(usersArray);
    } catch (error) {
      console.error("Fehler beim Abrufen der Benutzer:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComputerData({ ...computerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("jwtToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const computerPayload = {
      ...computerData,
      ram: computerData.ram ? Number(computerData.ram) : null,
      cpu: computerData.cpu ? Number(computerData.cpu) : null,
    };

    try {
      const response = await axios.post(
        `https://localhost:7167/api/user/computers`,
        computerPayload,
        config
      );
      console.log("Computer creation response:", response.data);
      alert("Speichern erfolgreich");
      if (typeof onClose === "function") {
        onClose();
      }
      window.location.reload();
    } catch (error) {
      console.error(
        "Fehler beim Erstellen der Bestellung:",
        error.response ? error.response.data : error.message
      );
      setError("Fehler beim Erstellen. Bitte versuchen Sie es später erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.CreateComputer} onSubmit={handleSubmit}>
      {error && <p className={styles.Error}>{error}</p>}
      <div className={styles.InputGroup}>
        <label htmlFor="userId"></label>
        <select
          name="userId"
          value={computerData.userId}
          onChange={handleChange}
          required
        >
          <option value="">Wähle einen Benutzer...</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>
      <Input
        name="computerName"
        placeholder="Computer Name"
        onChange={handleChange}
        value={computerData.computerName}
      />
      <Input
        name="ram"
        placeholder="RAM Size"
        onChange={handleChange}
        value={computerData.ram}
      />
      <Input
        name="cpu"
        placeholder="CPU Frequency"
        onChange={handleChange}
        value={computerData.cpu}
      />
      <Input
        name="mac"
        placeholder="MAC Address"
        onChange={handleChange}
        value={computerData.mac}
      />
      <Button
        variant="primary"
        label={loading ? "Speichern..." : "Create Computer"}
        type="submit"
        disabled={loading}
      />
    </form>
  );
}

export default CreateComputer;
