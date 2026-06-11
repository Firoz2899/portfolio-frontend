import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface AppState {
  routeName: string;
  searchQuery: string;
  headerSearch: string;
  viewMode: "grid" | "list";
  activeTab: string;
  mobileMenuOpen: boolean;
  sidebarOpen: boolean;
}

const initialState: AppState = {
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

export const {
  setRouteName,
  setSearchQuery,
  setHeaderSearch,
  toggleViewMode,
  setViewMode,
  setActiveTab,
  toggleMobileMenu,
  setMobileMenu,
  toggleSidebar,
  setSidebarOpen
} = appSlice.actions;

export default appSlice.reducer;