import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./CreateOrder.module.scss";

function CreateOrder({ onClose }) {
  const [users, setUsers] = useState([]);
  const [orderData, setOrderData] = useState({
    userId: "",
    orderName: "",
    orderDate: "",
    purchaseType: "",
    cashPurchasePrice: "",
    monthlyRate: "",
    term: "",
    finalPrice: "",
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
    const newValue = name === "purchaseType" ? value || "CashPurchase" : value;
    setOrderData({ ...orderData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("jwtToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const purchaseType = orderData.purchaseType === "CashPurchase" ? 0 : 1;

    const orderPayload = {
      ...orderData,
      purchaseType: purchaseType,
      cashPurchasePrice: orderData.cashPurchasePrice
        ? Number(orderData.cashPurchasePrice)
        : null,
      monthlyRate: orderData.monthlyRate ? Number(orderData.monthlyRate) : null,
      term: orderData.term ? Number(orderData.term) : null,
      finalPrice: orderData.finalPrice ? Number(orderData.finalPrice) : null,
      orderDate: orderData.orderDate ? orderData.orderDate : null,
    };

    try {
      const response = await axios.post(
        `https://localhost:7167/api/user/orders`,
        orderPayload,
        config
      );
      console.log("Order creation response:", response.data);
      alert("Order created!");
      if (typeof onClose === "function") {
        onClose();
      }
      window.location.reload();
    } catch (error) {
      console.error("Fehler beim Erstellen der Bestellung:", error.message);
      setError("Fehler beim Erstellen. Bitte versuchen Sie es später erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.CreateOrder} onSubmit={handleSubmit}>
      {error && <p className={styles.Error}>{error}</p>}
      <div className={styles.InputGroup}>
        <label htmlFor="userId"></label>
        <select
          name="userId"
          value={orderData.userId}
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
        name="orderName"
        placeholder="Order Name"
        onChange={handleChange}
        value={orderData.orderName}
      />
      <Input
        name="orderDate"
        placeholder="Order Date"
        type="date"
        onChange={handleChange}
        value={orderData.orderDate}
      />
      <div className={styles.RadioGroup}>
        <label>
          <input
            type="radio"
            name="purchaseType"
            value="CashPurchase"
            checked={orderData.purchaseType === "CashPurchase"}
            onChange={handleChange}
          />
          Instant Purchase
        </label>
        <label>
          <input
            type="radio"
            name="purchaseType"
            value="Financing"
            checked={orderData.purchaseType === "Financing"}
            onChange={handleChange}
          />
          Financing
        </label>
      </div>
      <Input
        name="cashPurchasePrice"
        placeholder="Price"
        onChange={handleChange}
        value={orderData.cashPurchasePrice}
        disabled={orderData.purchaseType === "Financing"}
      />
      <Input
        name="monthlyRate"
        placeholder="Monthly Rate"
        onChange={handleChange}
        value={orderData.monthlyRate}
        disabled={orderData.purchaseType === "CashPurchase"}
      />
      <Input
        name="term"
        placeholder="Term (Months)"
        onChange={handleChange}
        value={orderData.term}
        disabled={orderData.purchaseType === "CashPurchase"}
      />
      <Input
        name="finalPrice"
        placeholder="Final Price"
        onChange={handleChange}
        value={orderData.finalPrice}
        disabled={orderData.purchaseType === "CashPurchase"}
      />
      <Button
        variant="primary"
        label={loading ? "Speichern..." : "Create Order"}
        type="submit"
        disabled={loading}
      />
    </form>
  );
}

export default CreateOrder;
