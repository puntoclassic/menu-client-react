import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccountSigninStatus,
  AccountState,
  AccountVerifyStatus,
} from "@src/types";

var initialState: AccountState = {
  user: null,
  signinStatus: AccountSigninStatus.none,
  verifyAccountStatus: AccountVerifyStatus.none,
  pendingRequest: false,
  userLogged: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateUser: (
      state: any,
      action: PayloadAction<{ user?: any | null; logged: boolean }>,
    ) => {
      state.user = action.payload.user;
      state.userLogged = action.payload.logged;
    },
  },
});

const { actions, reducer } = accountSlice;

export const {
  updateUser,
} = actions;

export default reducer;
