import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IUser } from "@/types/data.types";
import { authApi } from "@/services";
import { ApiErrorTypes, localStorageKeys } from "@/constants";
import { router } from "@/App";
import type { IAuthState } from "@/types/state.types";
import { addAuthMatchers } from "./auth.matchers";


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
    addAuthMatchers(builder)
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;