import React, { useState } from "react";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({total, createOrder}) => {
  const [customer, setCustomer] = useState("");
    const [address, setAddress] = useState("");
    const handleClick = () => {
        createOrder({
            customer: customer,
            address: address,
            total: total,
            method: 0,
        });
    }


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}> You will pay ${total} after delivery</h1>
        <div className={styles.item}>
          <label htmlFor="">Name Surname</label>
          <input type="text" placeholder="John Doe" className={styles.input} onChange={(e)=>{setCustomer(e.target.value)}} />
        </div>
        <div className={styles.item}>
          <label htmlFor="">Phone Number</label>
          <input type="number" placeholder="+91 1234567890" className={styles.input} onChange={(e)=>{setCustomer(e.target.value)}} />
        </div>
        <div className={styles.item}>
          <label htmlFor="">Address</label>
          <input type="text" placeholder="Bhav Nagar,..." className={styles.input}  />
        </div>
        <button className={styles.button} onClick={handleClick}>Order</button>
      </div>
    </div>
  );
};

export default OrderDetail;
