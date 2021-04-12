import React from "react";
import { useState } from "react";
import AddCardForm from "./AddCardForm/AddCardForm";
import Card from "../Card/Card";
import styles from "./AddCard.module.css";
import { Link } from "react-router-dom";

const AddCard = (props) => {
  const [formData, setFormData] = useState({
    cardHolder: props.userName.toUpperCase(),
    cardNum: "XXXXXXXXXXXXXXXX",
    expireMonth: "",
    expireYear: "",
    vendor: "Visa",
    cvc: "",
    active: "active",
  });

  console.log(formData);
  return (
    <div className={styles.addCardContainer}>
      <Link className={styles.homeLink} to="/">
        <h1
          style={{
            color: "#daa520",
          }}
        >
          E-Wallet
        </h1>
      </Link>
      <div className={styles.addCardContent}>
        <Card {...formData} />
        <AddCardForm
          setData={setFormData}
          data={formData}
          status={props.userStatus}
        />
      </div>
    </div>
  );
};

export default AddCard;
