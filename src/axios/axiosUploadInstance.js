import { API_BASE_URL } from "@/constants";
import axios from 'axios';
import { store } from "../store/store";
const axiosUploadInstance = axios.create({
  baseURL: API_BASE_URL.PROD,
  withCredentials: true,
  withXSRFToken: true,
  timeout: 0, 
  maxContentLength: Infinity,
  maxBodyLength: Infinity, 
});

axiosUploadInstance.interceptors.request.use(
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

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    config.headers["Accept"] = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

axiosUploadInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosUploadInstance;