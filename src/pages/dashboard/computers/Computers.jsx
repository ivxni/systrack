import React, { useEffect, useState } from "react";
import axios from "axios";
import Computer from "./computer/Computer";
import styles from "./Computers.module.scss";
import Button from "../../../components/button/Button";
import Form from "../../../components/form/Form";

function Computers() {
  const [computers, setComputers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const deleteComputer = async (computerId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`https://systrack-its.azurewebsites.net/api/user/computers/${computerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComputers(computers.filter((computer) => computer.computerId !== computerId));
      alert("Computer deleted.");
    } catch (error) {
      console.error("Error:", error);
      alert("Error");
    }
  };

  useEffect(() => {
    const fetchComputers = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `https://systrack-its.azurewebsites.net/api/user/allcomputers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const computersData = response.data.$values;

        console.log(
          "Computer-IDs:",
          computersData.map((computer) => computer.computerId)
        );

        setComputers(computersData);
      } catch (error) {
        console.error(
          "Fehler beim Abrufen aller Bestellungen:",
          error.response || error
        );
      }
    };

    fetchComputers();
  }, []);

  return (
    <div className={styles.Computers}>
      <h1>Computers</h1>
      <Button
        label="Create New Computer"
        variant="primary"
        onClick={toggleCreateForm}
      />
      {showCreateForm && (
        <Form label="Create Computer" onClose={() => setShowCreateForm(false)} />
      )}
      {computers.length > 0 ? (
        <div className={styles.section__container}>
          {computers.map((computer) => (
            <div key={computer.computerId} className={styles.info__container}>
              <Computer computer={computer} onDelete={deleteComputer}/>
            </div>
          ))}
        </div>
      ) : (
        <p>No Computers found.</p>
      )}
    </div>
  );
}

export default Computers;
