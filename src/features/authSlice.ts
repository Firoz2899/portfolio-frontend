import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { IUser } from "@/types/data.types";
import { authApi } from "@/services";
import { localStorageKeys } from "@/constants";

interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
}

const initialState : IAuthState = {
  isAuthenticated: false,
  user: null
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
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.me.matchFulfilled,
      (state, {payload}) => {
        if(payload.IsSuccess){
          state.isAuthenticated = true;
          state.user = payload.Data.user;
        }
        else {
          state = initialState
        }
      }
    );
    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state, {payload}) => {
        if(payload.IsSuccess){
          state.user = null;
          state.isAuthenticated = false;
          localStorage.removeItem(localStorageKeys.accessToken)
          localStorage.removeItem(localStorageKeys.refreshToken)
          localStorage.removeItem(localStorageKeys.userData)
        }
      }
    );
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;