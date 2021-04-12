import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("cards/getUser", async () => {
  return fetch("https://randomuser.me/api").then((res) => res.json());
});

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    user: {
      name: "",
      status: "",
    },
    cards: [
      {
        cardHolder: "HASSE HANDGRANAT",
        cardNum: "6353738444343434",
        expireMonth: "11",
        expireYear: "25",
        vendor: "MasterCard",
        cvc: "111",
        active: "inactive",
      },
    ],
    maxCards: 4,
  },
  reducers: {
    setCardAtStart: (state) => {
      if (state.cards.length >= 1) {
        state.cards[0].active = "active";
      } else {
        return;
      }
    },

    setCardToActive: (state, action) => {
      for (let i = 0; i < state.cards.length; i++) {
        if (state.cards[i].active === "active") {
          state.cards[i].active = "inactive";
        }
        if (state.cards[i].cardNum === action.payload) {
          state.cards[i].active = "active";
        }
      }
    },

    addCard: (state, action) => {
      if (state.cards.length < state.maxCards) {
        action.payload.active = "inactive";
        state.cards.push(action.payload);
      }
    },

    deleteCard: (state, action) => {
      for (let i = 0; i < state.cards.length; i++) {
        if (state.cards[i].cardNum === action.payload) {
          state.cards.splice(i, 1);
        }
      }
    },
  },

  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      const nameOfUser = `${action.payload.results[0].name.first} ${action.payload.results[0].name.last}`;
      state.user.name = nameOfUser;
      state.user.status = "success";

      for (let i = 0; i < state.cards.length; i++) {
        state.cards[i].cardHolder = nameOfUser.toUpperCase();
      }
    },

    [getUser.rejected]: (state) => {
      state.user.status = "failed";
    },
  },
});

const { actions, reducer } = cardSlice;

export const { setCardAtStart, setCardToActive, deleteCard, addCard } = actions;

export default reducer;
