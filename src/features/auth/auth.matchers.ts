import { type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { authApi } from "@/services";
import type { IAuthState } from "@/types/state.types";
import { ApiErrorTypes, localStorageKeys } from "@/constants";
import { router } from "@/App";

export const addAuthMatchers = (
  builder: ActionReducerMapBuilder<IAuthState>
) => {
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
};