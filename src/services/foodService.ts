import axiosIstance from "@src/services/axiosIstance";
import routes from "@src/services/routes";
import { FoodFields } from "@src/types";

const foodService = {
  getFoodsByCategorySlug: (slug: string) => {
    return axiosIstance.get(
      routes.food.getByCategorySlug + slug,
    );
  },
  searchFoods: (key: string) => {
    return axiosIstance.get(
      routes.food.getSearchFoods,
      {
        params: {
          search: key,
        },
      },
    );
  },
  getFoods: async (params: any) => {
    try {
      var response = await axiosIstance.get(routes.food.getAll, {
        params: params,
      });

      return response.data;
    } catch (error) {
      return null;
    }
  },
  createFood: async (data: FoodFields) => {
    try {
      await axiosIstance.post(routes.food.postCreate, data);
      return true;
    } catch (error) {
      return false;
    }
  },
  updateFood: async (data: FoodFields) => {
    try {
      await axiosIstance.post(routes.food.postUpdate, data);
      return true;
    } catch (error) {
      return false;
    }
  },
  deleteFood: async (id: number) => {
    try {
      await axiosIstance.post(routes.food.postDelete, {
        id: id,
      });
      return true;
    } catch (error) {
      return false;
    }
  },
  getFood: (id: number) => {
    return axiosIstance.get(routes.food.getById + id);
  },
};

export default foodService;
