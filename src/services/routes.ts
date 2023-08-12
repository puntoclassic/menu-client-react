const dotnetBaseUrl = "http://localhost:8081";
export const backendUrl = dotnetBaseUrl;

const routes = {
  category: {
    getAll: `${backendUrl}/Api/Category/GetAll`,
    getBySlug: `${backendUrl}/Api/Category/GetBySlug/`,
    getById: `${backendUrl}/Api/Category/GetById/`,
    postCreate: `${backendUrl}/Api/Category/PostCreateCategory`,
    postUpdate: `${backendUrl}/Api/Category/PostUpdateCategory`,
    postDelete: `${backendUrl}/Api/Category/PostDeleteCategory`,
  },
  setting: {
    getAll: `${backendUrl}/Api/Setting/GetAll`,
    postSettings: `${backendUrl}/Api/Setting/PostUpdatedSettings`,
  },
  cart: {
    getCookie: `${backendUrl}/Api/Cart/GetCookie`,
    postCookie: `${backendUrl}/Api/Cart/PostCookie`,
  },
  food: {
    getByCategorySlug: `${backendUrl}/Api/Food/GetByCategorySlug/`,
    getSearchFoods: `${backendUrl}/Api/Food/Search`,
    getAll: `${backendUrl}/Api/Food/GetAll`,
    getById: `${backendUrl}/Api/Food/GetById/`,
    postCreate: `${backendUrl}/Api/Food/PostCreateFood`,
    postUpdate: `${backendUrl}/Api/Food/PostUpdateFood`,
    postDelete: `${backendUrl}/Api/Food/PostDeleteFood`,
  },
  account: {
    getAccountStatus: `${backendUrl}/Api/Account/GetAccountStatus/`,
    getEmailIsBusy: `${backendUrl}/Api/Account/GetEmailIsBusy`,
    getLogout: `${backendUrl}/Api/Account/GetLogout`,
    postCreateAccount: `${backendUrl}/Api/Account/PostCreateAccount`,
    postActivateAccountByToken:
      `${backendUrl}/Api/Account/PostActivateAccountByToken`,
    postResendActivationEmail: `${backendUrl}/Api/Account/PostRequireNewToken`,
    postLogin: `${backendUrl}/Api/Account/PostLogin`,
    postAccountResetPassword: `${backendUrl}/Api/Account/PostResetPassword`,
    postChangePasswordByToken:
      `${backendUrl}/Api/Account/PostChangePasswordByToken`,
    postUpdatePersonalInfo: `${backendUrl}/Api/Account/PostUpdatePersonalInfo`,
    postUpdatePassword: `${backendUrl}/Api/Account/PostUpdatePassword`,
  },
  orderStates: {
    getAll: `${backendUrl}/Api/OrderState/GetAll`,
    getById: `${backendUrl}/Api/OrderState/GetById`,
    postCreate: `${backendUrl}/Api/OrderState/PostCreateOrderState`,
    postUpdate: `${backendUrl}/Api/OrderState/PostUpdateOrderState`,
    postDelete: `${backendUrl}/Api/OrderState/PostDeleteOrderState`,
  },
  order: {
    getAllMyOrders: `${backendUrl}/Api/Order/GetUserOrders`,
    getAll: `${backendUrl}/Api/Order/GetAll`,
    getById: `${backendUrl}/Api/Order/GetById`,
    getOrderDetail: `${backendUrl}/Api/Order/GetOrderDetail`,
    postCreate: `${backendUrl}/Api/Order/PostCreate`,
    getPaymentUrl: `${backendUrl}/Api/Order/GetPaymentUrl`,
  },
};

export default routes;
