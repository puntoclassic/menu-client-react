import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@src/types";

var initialState: AppState = {
  categories: [],
  settings: {
    shippingCosts: 0,
    siteName: "",
    siteSubtitle: "",
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    pushCategories: (state: any, action: PayloadAction<any>) => {
      state.categories = action.payload.categories;
    },
    pushSiteName: (state: any, action: any) => {
      state.site_name = action.payload;
    },
    pushSiteSubtitle: (state: any, action: any) => {
      state.site_subtitle = action.payload;
    },
    pushSettings: (state: any, action: any) => {
      state.settings = action.payload;
    },
  },
});

const { actions, reducer } = appSlice;

export const {
  pushCategories,
  pushSiteName,
  pushSiteSubtitle,
  pushSettings,
} = actions;

export default reducer;
