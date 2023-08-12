import axiosIstance from "@src/services/axiosIstance";
import routes from "@src/services/routes";
import { OrderStateFields } from "@src/types";

const orderStateService = {
  getOrderStates: () => {
    return axiosIstance.get(routes.orderStates.getAll, {
      params: {
        paginated: false,
      },
    });
  },
  adminFetchOrderStates: async (params: any) => {
    try {
      var response = await axiosIstance.get(routes.orderStates.getAll, {
        params: params,
      });
      return { status: "success", ...response.data };
    } catch (error) {
      return { status: "error" };
    }
  },
  createOrderState: async (data: OrderStateFields) => {
    try {
      await axiosIstance.post(routes.orderStates.postCreate, data);
      return true;
    } catch (error) {
      return false;
    }
  },
  updateOrderState: async (data: OrderStateFields) => {
    try {
      await axiosIstance.post(routes.orderStates.postUpdate, data);
      return true;
    } catch (error) {
      return false;
    }
  },
  deleteOrderState: async (id: number) => {
    try {
      await axiosIstance.post(routes.orderStates.postDelete, {
        id: id,
      });
      return true;
    } catch (error) {
      return false;
    }
  },
  getOrderState: (id: number) => {
    return axiosIstance.get(routes.orderStates.getById, {
      params: {
        id: id,
      },
    });
  },
};

export default orderStateService;
