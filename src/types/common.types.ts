import type { RoleType } from "@/constants";
import type { LoadableComponent } from "@loadable/component";
import type { ComponentType } from "react";

export interface ApiResponse<T = any> {
  IsSuccess: boolean;
  Message: string;
  Data: T;
  ErrorType?: string;
  Errors?: any;
}

export interface AppRoute {
  name: string;
  path: string;
  component: LoadableComponent<unknown>;
  roles: RoleType[];
  layout?: ComponentType<{ children: React.ReactNode }>;
  buildPath?: (params?: Record<string, string | number>) => string;
  preload: () => any;
  preloadProps: {
    onMouseOver: () => any;
    onMouseEnter: () => any;
  }
}