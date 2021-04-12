import React from "react";
import styles from "../Card.module.css";

const CardBack = (props) => {
  const vendor = props.vendor;
  return (
    <div
      className={styles.creditCardBack}
      style={
        vendor === "Visa"
          ? { backgroundColor: "#355070" }
          : vendor === "MasterCard"
          ? { backgroundColor: "#335c67" }
          : vendor === "American"
          ? { backgroundColor: "#e63946" }
          : null
      }
    >
      <div className={styles.cardLine}></div>
      <div className={styles.cvcContainer}>
        <p>cvc: {props.cvc}</p>
      </div>
    </div>
  );
};

export default CardBack;
