import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./components/Cards/cardsSlice";

export default configureStore({
  reducer: {
    cards: cardsReducer,
  },
});
