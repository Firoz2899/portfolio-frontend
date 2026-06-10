import type { RoleType } from "@/constants";
import type { LoadableComponent } from "@loadable/component";

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
  buildPath?: (params?: Record<string, string | number>) => string;
  preloadProps: {
    onMouseOver: () => any;
    onMouseEnter: () => any;
  }
}