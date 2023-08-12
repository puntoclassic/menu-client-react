import { updateUser } from "../reducers/account";
import accountService from "@src/services/accountService";

//load the account status from server
export function loadAccountState() {
  return async function (dispatch: any, getState: any) {
    var response = await accountService.loadAccountState();

    dispatch(updateUser(response));
  };
}
