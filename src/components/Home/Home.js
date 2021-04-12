import React from "react";
import styles from "./Home.module.css";
import Cards from "../Cards/Cards";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const maxCards = useSelector((state) => state.cards.maxCards);
  const cardsList = useSelector((state) => state.cards.cards);
  return (
    <div className={styles.cardPage}>
      <Link className={styles.homeLink} to="/">
        <h1
          style={{
            color: "#daa520",
          }}
        >
          E-Wallet
        </h1>
      </Link>
      <Cards />
      <Link to="/addcard">
        <button
          disabled={cardsList.length === maxCards}
          className={styles.addCardBtn}
        >
          {cardsList.length === maxCards
            ? "You can't add anymore cards"
            : "Add Card"}
        </button>
      </Link>
    </div>
  );
};

export default Home;
