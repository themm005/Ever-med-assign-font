import axios from "axios";
import localStorageService from "../service/localStorageService";

axios.defaults.baseURL = "http://localhost:8900";

axios.interceptors.request.use(
  (config) => {
    if (localStorageService.getToken())
      config.headers.authorization = `Bearer ${localStorageService.getToken()}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export default axios;
