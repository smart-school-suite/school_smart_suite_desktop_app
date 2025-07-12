import { store } from "../store/store";
import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/', 
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

    config.headers["Content-Type"] = "application/json";
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