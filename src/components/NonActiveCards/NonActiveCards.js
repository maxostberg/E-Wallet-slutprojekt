import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import styles from "./NonActive.module.css";

const NonActiveCards = () => {
  const nonActiveCards = useSelector((state) => state.cards.cards);
  return (
    <div style={{ marginBottom: "2rem" }}>
      <ul>
        {nonActiveCards &&
          // eslint-disable-next-line array-callback-return
          nonActiveCards.map((card, i) => {
            if (card.active === "inactive") {
              return (
                <li key={i} className={styles.nonActive}>
                  <Card {...card} />
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default NonActiveCards;
