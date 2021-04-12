import React from "react";
import Card from "../Card/Card";
import styles from "./ActiveCard.module.css";
import { useSelector } from "react-redux";

const ActiveCard = () => {
  const activeCard = useSelector((state) => state.cards.cards);
  return (
    <div className={styles.activeContainer}>
      <h3 style={{ marginBottom: "1rem", color: "white" }}>Active card</h3>
      {activeCard &&
        // eslint-disable-next-line array-callback-return
        activeCard.map((card, i) => {
          if (card.active === "active") {
            return <Card {...card} key={i} />;
          }
          if (activeCard.length === 0) {
            return <h2>You have not added any cards</h2>;
          }
        })}
    </div>
  );
};

export default ActiveCard;
