import { API_BASE_URL, TOKEN_KEY } from "@/constants";
import axios from 'axios';
import { secureTokenStorage } from "../services/secureStore/secureTokenStorage";
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
  async (config) => {
    const state = store.getState();

    // Same key as every other request (authAxios); "authToken" was never set,
    // so uploads went out without a token and got "Unauthenticated".
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