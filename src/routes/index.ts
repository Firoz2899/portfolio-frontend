import { RouteNames } from "@/constants";
import type { AppRoute } from "@/types/common.types";
import loadable, { type LoadableComponent } from "@loadable/component";

const preloadProps = (component: LoadableComponent<unknown>) => ({
    component: component,
    preloadProps: {
        onMouseEnter: component.preload,
        onMouseOver: component.preload
    }
})

export const AppRoutes : AppRoute[] = [
  {
    name: RouteNames.auth.SignIn,
    path: "/SignIn",
    ...preloadProps(loadable(() => import("@/pages/auth/SignIn"))),
    roles: []
  },
  {
    name: RouteNames.auth.SignUp,
    path: "/SignUp",
    ...preloadProps(loadable(() => import("@/pages/auth/Signup"))),
    roles: []
  },
  {
    name: RouteNames.auth.ForgotPassword,
    path: "/Forgot-Password",
    ...preloadProps(loadable(() => import("@/pages/auth/ForgotPassword"))),
    roles: []
  },
  {
    name: RouteNames.public.NotFound,
    path: "/*",
    ...preloadProps(loadable(() => import("@/pages/public/NotFound"))),
    roles: []
  }
];