import axiosIstance from "@src/services/axiosIstance";
import routes from "@src/services/routes";
import { SettingFields } from "@src/types";

const configService = {
  updateSettings: async (data: SettingFields) => {
    try {
      await axiosIstance.post(routes.setting.postSettings, data);
      return true;
    } catch (error) {
      return false;
    }
  },
  getSettings: () => {
    return axiosIstance.get(routes.setting.getAll);
  },
};

export default configService;
