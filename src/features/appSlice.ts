import { localStorageKeys } from "@/constants";
import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

type ThemeMode = "light" | "dark";
type ViewModeType = "grid" | "list";

interface AppState {
  themeMode: ThemeMode | null;
  routeName: string;
  searchQuery: string;
  headerSearch: string;
  viewMode: ViewModeType;
  activeTab: string;
  mobileMenuOpen: boolean;
  sidebarOpen: boolean;
}

const initialState: AppState = {
  themeMode: localStorage.getItem(localStorageKeys.themeMode) as ThemeMode || null,
  routeName: "",
  searchQuery: "",
  headerSearch: "",
  viewMode: "grid",
  activeTab: "dashboard",
  mobileMenuOpen: false,
  sidebarOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRouteName(state, action: PayloadAction<string>) {
      state.routeName = action.payload;
    },
    setThemeMode(state, action: PayloadAction<ThemeMode | null>){
      state.themeMode = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setHeaderSearch(state, action: PayloadAction<string>) {
      state.headerSearch = action.payload;
    },
    toggleViewMode(state) {
      state.viewMode = state.viewMode === "grid" ? "list" : "grid";
    },
    setViewMode(state, action: PayloadAction<"grid" | "list">) {
      state.viewMode = action.payload;
    },
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenu(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;