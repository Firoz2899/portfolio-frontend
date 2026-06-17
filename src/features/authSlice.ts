import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { IUser } from "@/types/data.types";
import { authApi } from "@/services";
import { ApiErrorTypes, localStorageKeys } from "@/constants";
import { router } from "@/App";

interface IAuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  authChecked: boolean;
  user: IUser | null;
  retryRefreshingTokenCount: number;
}

const initialState : IAuthState = {
  isLoading: true,
  isAuthenticated: false,
  authChecked: false,
  user: null,
  retryRefreshingTokenCount: 0
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.authChecked = false;
    },
    setRetringRefreshTokenCount(state){
      state.retryRefreshingTokenCount = state.retryRefreshingTokenCount + 1;
    },
    setAuthChecked(state, action: PayloadAction<boolean>){
      state.authChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.me.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.me.matchFulfilled,
      (state, {payload}) => {
        state.isLoading = false;
        state.authChecked = true;
        if(payload.IsSuccess){
          state.isAuthenticated = true;
          state.user = payload.Data.user;
        }
        else {
          state.isAuthenticated = false;
          state.user = null;
        }
      }
    );
    builder.addMatcher(
      authApi.endpoints.me.matchRejected,
      (state, action) => {
        state.isLoading = false;
        const errorType = action?.payload?.data?.ErrorType ?? "";

        const authErrors = [
          ApiErrorTypes.UNAUTHORIZED,
          ApiErrorTypes.TOKEN_EXPIRED,
          ApiErrorTypes.INVALID_TOKEN,
          ApiErrorTypes.REFRESH_TOKEN_INVALID_OR_EXPIRED,
        ] as string[];

        if (authErrors.includes(errorType)) {
          state.authChecked = true;
          state.isAuthenticated = false;
          state.user = null;
        }
      }
    );
    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state, {payload}) => {
        if(payload.IsSuccess){
          state.user = null;
          state.isAuthenticated = false;
          state.authChecked = false;
          localStorage.removeItem(localStorageKeys.userData)
          router.navigate("/SignIn")
        }
      }
    );
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;