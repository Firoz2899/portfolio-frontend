import { router } from "@/App";
import { localStorageKeys, RouteNames } from "@/constants";
import { authActions } from "@/features";
import { getRoute } from ".";

export const clearAuthData = () => {
  localStorage.removeItem(localStorageKeys.userData);
};

export const logout = (store: any) => {
  clearAuthData();

  const route = getRoute(RouteNames.auth.SignIn)
  router.navigate(route!.path)

  if(store){
    store.dispatch(
      authActions.logout()
    );

    store.dispatch(
      authActions.setAuthChecked(true)
    );
  }

};