import axios from "axios";
import QueryString from "qs";
import { STT_NOT_AUTH } from "src/constants/common";
import { API_ENDPOINT } from "src/constants/env";
import PAGES from "src/constants/router";
import { useAuthStore } from "src/store/authStore";

export const api = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 60_000,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    serialize: (params) => {
      return QueryString.stringify(params, {
        arrayFormat: "repeat",
        allowDots: true,
      });
    },
  },
});

api.interceptors.request.use(
  function (config) {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers["Authorization"] =
        `Bearer ${token}` + (localStorage.getItem("lang") ?? "");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 500) {
      window.navigate(PAGES.PAGE_500);
      return Promise.reject(error);
    }

    if (STT_NOT_AUTH.includes(error.response?.status)) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);
