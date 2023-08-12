import axiosIstance from "@src/services/axiosIstance";
import routes from "@src/services/routes";
import { CategoryFields } from "@src/types";

const categoryService = {
  getCategory: (id: number) => {
    return axiosIstance.get(routes.category.getById + id);
  },
  getCategoryBySlug: (slug: string) => {
    return axiosIstance.get(
      routes.category.getBySlug + slug,
    );
  },
  fetchCategories: () => {
    return axiosIstance.get(routes.category.getAll, {
      params: {
        paginated: false,
      },
    });
  },
  fetchCategoriesForSelect: () => {
    return axiosIstance.get(routes.category.getAll, {
      params: {
        paginated: false,
      },
    });
  },
  adminFetchCategories: async (params: any) => {
    try {
      var response = await axiosIstance.get(routes.category.getAll, {
        params: params,
      });

      return response.data;
    } catch (error) {
      return {
        status: "error",
      };
    }
  },
  createCategory: async (data: CategoryFields) => {
    try {
      await axiosIstance.post(routes.category.postCreate, {
        name: data.name,
        image: data.image[0],
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  },
  updateCategory: async (data: CategoryFields) => {
    try {
      await axiosIstance.post(routes.category.postUpdate, {
        id: data.id,
        name: data.name,
        image: data.image[0],
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  },
  deleteCategory: async (id: number) => {
    try {
      await axiosIstance.post(routes.category.postDelete, { id: id });
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default categoryService;
