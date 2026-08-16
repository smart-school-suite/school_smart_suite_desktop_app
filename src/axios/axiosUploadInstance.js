import { store } from "../store/store";
import axios from 'axios';

const axiosUploadInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  withCredentials: true,
  withXSRFToken: true,
  timeout: 0, // no timeout — large uploads can take a while; set a value (e.g. 60000) if you want a cap
  maxContentLength: Infinity,
  maxBodyLength: Infinity, // needed so axios doesn't choke on large multipart bodies
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