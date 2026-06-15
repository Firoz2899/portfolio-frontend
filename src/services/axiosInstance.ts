// src/services/axiosInstance.js

import axios from "axios";
import { config, ApiErrorTypes, apiUrls, localStorageKeys, RouteNames } from "@/constants";
import {getRoute} from '@/utils/route.helpers'

const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(localStorageKeys.accessToken);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorType = error.response?.data?.ErrorType;
    const route = getRoute(RouteNames.auth.SignIn)

    // Prevent infinite refresh loops
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

     // Access token expired
    if (errorType === ApiErrorTypes.TOKEN_EXPIRED) {
      originalRequest._retry = true;

      const prevRefreshToken = localStorage.getItem(localStorageKeys.refreshToken);

      if(!prevRefreshToken){
        localStorage.removeItem(localStorageKeys.accessToken);
        localStorage.removeItem(localStorageKeys.refreshToken);
        if (route) {
          window.location.href = route.path;
        }
        return Promise.reject(error);
      }


      try {
        const refreshResponse = await axios.post(
          apiUrls.auth.refreshToken,
          {
            refreshToken: prevRefreshToken
          },
          {
            baseURL: config.apiBaseUrl,
            withCredentials: true,
          }
        );

        const accessToken = refreshResponse.data.Data.accessToken;
        
        localStorage.setItem(
          localStorageKeys.accessToken,
          accessToken
        );
        
        const refreshToken = refreshResponse.data.Data.refreshToken;
        localStorage.setItem(
          localStorageKeys.refreshToken,
          refreshToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(localStorageKeys.accessToken);
        localStorage.removeItem(localStorageKeys.refreshToken);

        // store.dispatch(authActions.logout())

        if(route)
          window.location.replace(route.path);

        return Promise.reject(refreshError);
      }
    }

    // Refresh token invalid/expired
    if (
      errorType === ApiErrorTypes.REFRESH_TOKEN_INVALID_OR_EXPIRED ||
      errorType === ApiErrorTypes.INVALID_TOKEN
    ) {
      localStorage.removeItem(localStorageKeys.accessToken);
      localStorage.removeItem(localStorageKeys.refreshToken);

      // store.dispatch(authActions.logout())

      if(route)
        window.location.href = route.path;
    }
    
    return Promise.reject(error);
  }
);

export {axiosInstance};
