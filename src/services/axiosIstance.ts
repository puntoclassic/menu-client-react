import axios from "axios";

var axiosIstance = axios.create({
  withCredentials: true,
});

export default axiosIstance;
