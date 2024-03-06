import React, { useEffect, useState } from "react";
import axios from "axios";
import Order from "./order/Order";
import styles from "./Orders.module.scss";
import Button from "../../../components/button/Button";
import Form from "../../../components/form/Form";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const deleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`https://systrack-its.azurewebsites.net/api/user/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(orders.filter((order) => order.orderId !== orderId));
      alert("Order deleted.");
    } catch (error) {
      console.error("Error:", error);
      alert("Error");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `https://localhost:7167/api/user/allorders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const ordersData = response.data.$values;

        console.log(
          "Order-IDs:",
          ordersData.map((order) => order.orderId)
        );

        setOrders(ordersData);
      } catch (error) {
        console.error(
          "Fehler beim Abrufen aller Bestellungen:",
          error.response || error
        );
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={styles.Orders}>
      <h1>Orders</h1>
      <Button
        label="Create New Order"
        variant="primary"
        onClick={toggleCreateForm}
      />
      {showCreateForm && (
        <Form label="Create Order" onClose={() => setShowCreateForm(false)} />
      )}
      {orders.length > 0 ? (
        <div className={styles.section__container}>
          {orders.map((order) => (
            <div key={order.orderId} className={styles.info__container}>
              <Order order={order} onDelete={deleteOrder}/>
            </div>
          ))}
        </div>
      ) : (
        <p>No Orders found.</p>
      )}
    </div>
  );
}

export default Orders;
