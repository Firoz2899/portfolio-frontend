import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface AppState {
  mobileMenuOpen: boolean;
}

const initialState: AppState = {
  mobileMenuOpen: false,
};

const appSlice = createSlice({
  name: "app",

  initialState,

  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },

    setMobileMenu(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
  },
});

export const {
  toggleMobileMenu,
  setMobileMenu,
} = appSlice.actions;

export default appSlice.reducer;