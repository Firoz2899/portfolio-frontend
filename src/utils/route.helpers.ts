import { type RoleType } from '@/constants';
import { AppRoutes } from '@/routes';
import type { AppRoute } from '@/types/common.types';

export const hasRole = (
    userRoles: RoleType[],
    role: RoleType
) => userRoles.includes(role);

export const hasAnyRole = (
    userRoles: RoleType[],
    roles: RoleType[]
) => {
    return roles.some(role =>
        userRoles.includes(role)
    );
};

export const getRoute = (name: string) => {
    const r = AppRoutes.find(x => x.name === name);
    if(!r){
        throw new Error(`Route with name "${name}" is not found.`)
    }
    return r;
};

export const prefetchRoute = (name: string) => {
  const route = getRoute(name);

  if (route?.component?.preload) {
    route.component.preload();
  }
};

export const buildRoute = (
  routeName: string,
  params?: Record<string, string | number>
) => {
  const route = getRoute(routeName);

  if (!route) {
    throw new Error(`Route ${routeName} not found`);
  }

  let path = route.path;

  Object.entries(params ?? {}).forEach(([key, value]) => {
    path = path.replace(`:${key}`, String(value));
  });

  return path;
};

export const canAccessRoute = (
    route: AppRoute,
    userRoles: RoleType[]
) => {
    if (route.roles.length === 0) {
        return true;
    }

    return route.roles.some(role =>
        userRoles.includes(role)
    );
};

export const getAccessibleRoutes = (
    userRoles: RoleType[]
) => {
    return AppRoutes.filter(route =>
        canAccessRoute(route, userRoles)
    );
};