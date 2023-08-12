import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, MessagesState } from "@src/types";

var initialState: MessagesState = {};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    resetMessages: (state: MessagesState) => {
      state.message = null;
    },
    pushMessage: (
      state: MessagesState,
      action: PayloadAction<Message>,
    ) => {
      state.message = action.payload;
    },
  },
});

const { actions, reducer } = messagesSlice;

export const {
  pushMessage,
  resetMessages,
} = actions;

export default reducer;
