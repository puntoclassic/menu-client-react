import { cartService } from "@src/services/cartService";
import {
  addToCartAction,
  decreaseQtyAction,
  increaseQtyAction,
  pushCartAction,
  removeFromCartAction,
} from "../reducers/cart";
import { CartState } from "@src/types";

export function addToCart(item: any) {
  return function (dispatch: any, getState: any) {
    dispatch(addToCartAction(item));
  };
}

export function removeFromCart(item: any) {
  return function (dispatch: any, getState: any) {
    dispatch(removeFromCartAction(item));
  };
}

export function increaseQty(item: any) {
  return function (dispatch: any, getState: any) {
    dispatch(increaseQtyAction(item));
  };
}

export function decreaseQty(item: any) {
  return function (dispatch: any, getState: any) {
    dispatch(decreaseQtyAction(item));
  };
}

export function readCartFromStorage() {
  return async function (dispatch: any, getState: any) {
    var cart = localStorage.getItem("cart");

    if (cart) {
      dispatch(pushCartAction(JSON.parse(cart)));
    }
  };
}

export async function storeCartToStorage(state: CartState) {
  localStorage.setItem("cart", JSON.stringify(state));
}
