import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { storeCartToStorage } from "../thunks/cart";

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { CartItem, CartState, TipologiaConsegna } from "@src/types";

var initialState: CartState = {
  items: {},
  total: 0,
  indirizzo: "",
  orario: "",
  note: "",
  tipologiaConsegna: TipologiaConsegna.ASPORTO,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartAction: (
      state: CartState,
      action: PayloadAction<CartItem>,
    ) => {
      state.items[action.payload.id] = {
        item: action.payload,
        quantity: 1,
      };
    },
    removeFromCartAction: (
      state: CartState,
      action: PayloadAction<CartItem>,
    ) => {
      delete state.items[action.payload.id];
      //calcolo il subtotale
    },
    increaseQtyAction: (
      state: CartState,
      action: PayloadAction<CartItem>,
    ) => {
      state.items[action.payload.id].quantity += 1;
    },

    decreaseQtyAction: (
      state: CartState,
      action: PayloadAction<CartItem>,
    ) => {
      if (state.items[action.payload.id].quantity > 1) {
        state.items[action.payload.id].quantity -= 1;
      } else {
        //altrimenti elimina il prodotto
        delete state.items[action.payload.id];
      }
    },
    pushCartAction: (state: CartState, action: PayloadAction<CartState>) => {
      return action.payload;
    },
    pushTipologiaConsegna: (
      state: CartState,
      action: PayloadAction<TipologiaConsegna>,
    ) => {
      state.tipologiaConsegna = action.payload;
    },
    pushInformazioniConsegna: (
      state: CartState,
      action: PayloadAction<
        { indirizzo: string; orario: string; shippingCosts?: number }
      >,
    ) => {
      state.indirizzo = action.payload.indirizzo;
      state.orario = action.payload.orario;
    },

    pushNote: (state: CartState, action: PayloadAction<{ note: string }>) => {
      state.note = action.payload.note;
    },
    resetCart: (state: CartState, action: PayloadAction) => {
      state.indirizzo = initialState.indirizzo;
      state.items = initialState.items;
      state.note = initialState.note;
      state.orario = initialState.orario;
      state.tipologiaConsegna = initialState.tipologiaConsegna;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        createAction("cart/addToCartAction"),
        createAction("cart/removeFromCartAction"),
        createAction("cart/increaseQtyAction"),
        createAction("cart/decreaseQtyAction"),
      ),
      (
        state: CartState,
      ) => {
        state.total = 0;
        Object.values(state.items).forEach((row: any) => {
          state.total += row.item.price! *
            row.quantity;
        });

        storeCartToStorage(state);
      },
    );
  },
});

const { actions, reducer } = cartSlice;

export const {
  addToCartAction,
  decreaseQtyAction,
  increaseQtyAction,
  removeFromCartAction,
  pushCartAction,
  pushInformazioniConsegna,
  pushNote,
  pushTipologiaConsegna,
  resetCart,
} = actions;

export default reducer;
