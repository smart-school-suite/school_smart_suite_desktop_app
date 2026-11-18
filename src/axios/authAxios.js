import { API_BASE_URL, TOKEN_KEY } from "@/constants";
import axios from 'axios';
import { secureTokenStorage } from "../services/secureStore/secureTokenStorage";
import { store } from "../store/store";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL.DEV, 
  withCredentials: true,
  withXSRFToken: true
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const state = store.getState();

    const token = await secureTokenStorage.get(TOKEN_KEY.AUTH_TOKEN);
    const apiKey = state.auth?.apiKey;

    if (!config.headers) {
      config.headers = {};
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (apiKey) {
      config.headers["API-KEY"] = apiKey;
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