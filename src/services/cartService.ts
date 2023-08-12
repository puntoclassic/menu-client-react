import axiosIstance from "@src/services/axiosIstance";
import routes from "@src/services/routes";

const getCartCookieData = () => {
  return axiosIstance.get(routes.cart.getCookie);
};

const pushCartCookieData = (data: any) => {
  return axiosIstance.post(routes.cart.postCookie, data);
};

export const cartService = {
  getCartCookieData,
  pushCartCookieData,
};
