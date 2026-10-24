import { API_BASE_URL } from "@/constants";
import axios from 'axios';
import { secureTokenStorage } from "../services/secureStore/secureTokenStorage";
import { store } from "../store/store";

const axiosUploadInstance = axios.create({
  baseURL: API_BASE_URL.DEV,
  withCredentials: true,
  withXSRFToken: true,
  timeout: 0, 
  maxContentLength: Infinity,
  maxBodyLength: Infinity, 
});

axiosUploadInstance.interceptors.request.use(
  async (config) => {
    const state = store.getState();

    const token = await secureTokenStorage.get("authToken");
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