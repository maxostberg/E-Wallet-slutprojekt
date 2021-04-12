import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./AddCardForm.module.css";
import { addCard } from "../../Cards/cardsSlice";
import { useHistory } from "react-router";

const AddCardForm = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();

  /* local state for each data that needs to be checked */
  const [cardNumber, setNumberState] = useState();
  const [cardCvc, setCvcState] = useState();
  const [cardDate, setDateState] = useState();

  /* function that handles the date */
  const handleDate = (e) => {
    if (e.target.value.length <= 5) {
      setDateState(true);
      e.target.value = e.target.value
        .replace(/[^0-9]/g, "")
        .replace(/(\d{2})(\d{1})/, "$1/$2");
      if (e.target.value.slice(0, 2) >= 1 && e.target.value.slice(0, 2) <= 12) {
        if (e.target.value.length === 5) {
          setDateState(false);
          props.setData({
            ...props.data,
            expireMonth: e.target.value.slice(0, 2),
            expireYear: `20${e.target.value.slice(3, 5)}`,
          });
        }
      }
    }
  };
  /* Handles the other inputs */
  const handleInputChange = (e) => {
    if (e.target.id === "cardNum") {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
      if (e.target.value.length < 16 && e.target.value.length > 8) {
        setNumberState(true);
      } else {
        setNumberState(false);
        props.setData({
          ...props.data,
          cardNum: e.target.value,
        });
      }
    }
    if (e.target.id === "cardHolder") {
      e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, "");
      props.setData({
        ...props.data,
        cardHolder: e.target.value.toUpperCase(),
      });
    }

    if (e.target.id === "cvc") {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
      if (e.target.value.length < 3) {
        setCvcState(true);
      } else {
        setCvcState(false);
        props.setData({ ...props.data, cvc: e.target.value });
      }
    }

    if (e.target.id === "vendor") {
      props.setData({ ...props.data, vendor: e.target.value });
    }
  };

  /* Submit Function that checks every inputted data if it is correct data before sumbitting it */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber === false && cardDate === false && cardCvc === false) {
      dispatch(addCard(props.data));
      history.push("/home");
    }
  };

  return (
    <form className={styles.addCardForm} onSubmit={handleSubmit}>
      <label className={styles.formLabel}>Card Number:</label>
      <input
        type="text"
        name="cardNum"
        id="cardNum"
        placeholder="Cardnumber.."
        maxLength="16"
        onChange={handleInputChange}
        className={styles.inputStyle}
      ></input>
      {cardNumber ? (
        <span className={styles.error}>
          Your cardnumber must have 16 digits
        </span>
      ) : null}
      <label className={styles.formLabel}>Card Holder:</label>
      <input
        type="text"
        name="cardHolder"
        id="cardHolder"
        value={props.data.cardHolder}
        onChange={handleInputChange}
        className={styles.inputStyle}
        disabled={props.status === "success" ? true : false}
      ></input>
      <div className={styles.expireCvc}>
        <div>
          <label className={styles.formLabel}>MM/YY:</label>
          <div className={styles.expireContainer}>
            <input
              type="text"
              name="expireDate"
              id="expireDate"
              maxLength="5"
              onChange={handleDate}
              className={styles.inputStyle}
            ></input>
            {cardDate ? (
              <span className={styles.error}>Date must be in MM/YY format</span>
            ) : null}
          </div>
        </div>
        <div className={styles.cvcContainer}>
          <div className={styles.cvcContent}>
            <label className={`${styles.formLabel} ${styles.cvcLabel}`}>
              CVC:
            </label>
            <input
              type="text"
              name="cvc"
              id="cvc"
              maxLength="3"
              onChange={handleInputChange}
              className={`${styles.inputStyle} ${styles.cvc}`}
            ></input>
          </div>
          {cardCvc ? (
            <span className={`${styles.error} ${styles.cvcError}`}>
              CVC must have 3 digits
            </span>
          ) : null}
        </div>
      </div>
      <label className={styles.formLabel}>Pick your vendor of choice:</label>
      <select
        value={props.data.vendor}
        onChange={handleInputChange}
        id="vendor"
        className={styles.selectForm}
      >
        <option value="Visa">Visa</option>
        <option value="MasterCard">MasterCard</option>
        <option value="American">American Express</option>
      </select>
      <button className={styles.addCardBtn}>Add Card</button>
    </form>
  );
};

export default AddCardForm;
