import React from "react";
import NonActiveCards from "../NonActiveCards/NonActiveCards";
import ActiveCard from "../ActiveCard/ActiveCard";
import { useDispatch } from "react-redux";
import { setCardAtStart } from "./cardsSlice";
import { useEffect } from "react";
import styles from "./Cards.module.css";

const Cards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCardAtStart());
  }, [dispatch]);
  return (
    <div className={styles.cardsContiner}>
      <ActiveCard />
      <NonActiveCards />
    </div>
  );
};

export default Cards;
