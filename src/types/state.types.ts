import type { IProfile, ISkill, IUser } from "./data.types";

export interface IProfileState {
  isLoading: boolean;
  editProfile: IProfile | null;
  profile: IProfile | null;
  shouldRefreshProfile: boolean;
  hasUpdatedAnyField: boolean;
  skills: ISkill[];
}

export type ThemeMode = "light" | "dark";
export type ViewModeType = "grid" | "list";

export interface AppState {
  themeMode: ThemeMode | null;
  routeName: string;
  searchQuery: string;
  headerSearch: string;
  viewMode: ViewModeType;
  activeTab: string;
  mobileMenuOpen: boolean;
  sidebarOpen: boolean;
}

export interface IAuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  authChecked: boolean;
  user: IUser | null;
  retryRefreshingTokenCount: number;
}