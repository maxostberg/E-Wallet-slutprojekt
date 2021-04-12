import React from "react";
import CardFront from "./CardFront/CardFront";
import CardBack from "./CardBack/CardBack";
import ReactCardFlip from "react-card-flip";
import { useDispatch } from "react-redux";
import { setCardToActive, deleteCard } from "../Cards/cardsSlice";
import { useState } from "react";
import styles from "./Card.module.css";

const Card = (props) => {
  const dispatch = useDispatch();
  /* Formatting cardnumber */
  const cardNum = `${props.cardNum.slice(0, 4)}-${props.cardNum.slice(
    4,
    8
  )}-${props.cardNum.slice(8, 12)}-${props.cardNum.slice(12, 16)}`;

  /* Card flip */
  const [isFlipped, setIsFlipped] = useState(false);

  /* Hover element */
  const [showDelete, setShowDelete] = useState(false);

  const handleCard = (e) => {
    if (e.currentTarget.classList.contains("active")) {
      setIsFlipped(!isFlipped);
    }
    if (e.currentTarget.classList.contains("inactive")) {
      dispatch(setCardToActive(props.cardNum));
    }
  };

  const handleDelete = (e) => {
    if (e.currentTarget.classList.contains(styles.deleteBtn)) {
      dispatch(deleteCard(props.cardNum));
    }
  };

  return (
    <div
      className={props.active}
      onDoubleClick={handleCard}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <CardFront cardNumber={cardNum} {...props}>
          {showDelete && props.active === "inactive" ? (
            <div className={styles.deleteBtn} onClick={handleDelete}>
              <i className="fas fa-times"></i>
            </div>
          ) : null}
        </CardFront>

        <CardBack cvc={props.cvc} vendor={props.vendor}></CardBack>
      </ReactCardFlip>
    </div>
  );
};

export default Card;
