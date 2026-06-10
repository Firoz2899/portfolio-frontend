import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { IUser } from "@/types/data.types";

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
});

export const {
  setUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;