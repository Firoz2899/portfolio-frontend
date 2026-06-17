import axios, { type AxiosInstance as axiosInstanceType } from "axios";
import {
  ApiErrorTypes,
  apiUrls,
  config,
  localStorageKeys,
} from "@/constants";

import { logout } from "@/utils";
import { router } from "@/App";

export let axiosInstance: axiosInstanceType | null = null;


let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[] = [];


const processQueue = (
  error: any,
  token: string | null = null
) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });

  failedQueue = [];
};


export const setupAxiosInstance = (store: any) => {
  axiosInstance = axios.create({
    baseURL: config.apiBaseUrl,
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem(
        localStorageKeys.accessToken
      );

      if (accessToken) {
        config.headers.Authorization =
          `Bearer ${accessToken}`;
      }

      return config;
    },
    Promise.reject
  );

  
  axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      const errorType =
        error?.response?.data?.ErrorType;

      if (
        originalRequest?._retry ||
        originalRequest?.url?.includes(
          apiUrls.auth.refreshToken
        )
      ) {
        return Promise.reject(error);
      }

      const isTokenExpired =
        errorType === ApiErrorTypes.TOKEN_EXPIRED ||
        errorType === ApiErrorTypes.INVALID_TOKEN;

      if (!isTokenExpired) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization =
                `Bearer ${token}`;

              resolve(
                axiosInstance?.(originalRequest)
              );
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          apiUrls.auth.refreshToken,
          {},
          {
            baseURL: config.apiBaseUrl,
            withCredentials: true,
          }
        );

        const accessToken =
          response.data.Data.accessToken;

        localStorage.setItem(
          localStorageKeys.accessToken,
          accessToken
        );

        processQueue(null, accessToken);

        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        return axiosInstance?.(originalRequest);
      } catch (refreshError: any) {
        processQueue(refreshError);

        const refreshErrorType =
          refreshError?.response?.data?.ErrorType;

        if (
          refreshErrorType ===
            ApiErrorTypes.REFRESH_TOKEN_INVALID_OR_EXPIRED ||
          refreshErrorType ===
            ApiErrorTypes.INVALID_TOKEN
        ) {
          logout(store);
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
}

