import { store } from "../store/store";
import axios from 'axios';
import { API_BASE_URL} from "@/constants";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL.DEV, 
  withCredentials:true,
  withXSRFToken:true
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();

    const apiKey = state.auth?.apiKey;
    const token = state.auth?.token;

    if (!config.headers) {
      config.headers = {};
    }

    if (apiKey) {
      config.headers["API-KEY"] = apiKey;
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    config.headers["Accept"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;