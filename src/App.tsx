import { createBrowserRouter, RouterProvider, type Router as createBrowserRouterType } from "react-router-dom"
import { getAccessibleRoutes } from "@/utils/route.helpers";
import {authApiHooks, setupAxiosInstance} from '@/services'
import { useThemeMode, useAppSelector } from "@/hooks";
import { Loader } from "@/components/Common/Loader";
import { useStore } from 'react-redux'
// import { localStorageKeys } from "./constants";
import { useMemo } from "react";

export let router: any;

function App() {
  // const userData = localStorage.getItem(localStorageKeys.userData);
  const store = useStore()
  setupAxiosInstance(store)
  useThemeMode();
  const {user, isLoading, authChecked, isAuthenticated} = useAppSelector((state) => state.auth);
  authApiHooks.useMeQuery(undefined, {
    skip: authChecked || user != null,
  })
  
  
  router = useMemo(() => {
    const routes = getAccessibleRoutes(user?.Role || [])
    .map(route => {
      const Page = route.component;
      const Layout = route.layout;

      return {
        path: route.path,
        element: Layout ? (
          <Layout>
            <Page />
          </Layout>
        ) : (
          <Page />
        ),
      };
    });

    return createBrowserRouter(routes);
  }, [user, authChecked, isAuthenticated])
  
  if(isLoading && !authChecked){
    return <Loader/>
  }

  return (
    <RouterProvider router={router} />
  )
}

export default App
