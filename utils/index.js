import axios from "axios";

export const API = axios.create({
  baseURL: "https://kodikas-admin-portal.vercel.app",
});

API.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    if (accessToken) {
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
