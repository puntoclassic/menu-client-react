import categoryService from "@src/services/categoryService";
import configService from "@src/services/configService";
import { pushCategories, pushSettings } from "../reducers/app";

export function fetchCategories() {
  return async function (dispatch: any, getState: any) {
    var response = await categoryService.fetchCategories();

    const { items } = response.data;

    dispatch(pushCategories({
      categories: items,
    }));
  };
}

export function fetchSettings() {
  return async function (dispatch: any, getState: any) {
    var response = await configService.getSettings();

    dispatch(pushSettings(
      response.data,
    ));
  };
}
