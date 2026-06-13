import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { getAccessibleRoutes } from "./utils/route.helpers";
import {authApiHooks} from '@/services'
import { useAppSelector } from "./hooks";
import { localStorageKeys } from "./constants";
import { useThemeMode } from "./hooks/useThemeMode";

function App() {
  useThemeMode();
  const token = localStorage.getItem(localStorageKeys.accessToken);
  const user = useAppSelector((state) => state.auth.user);
  authApiHooks.useMeQuery(undefined, {
    skip: !token || !!user,
  })


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

  const router = createBrowserRouter(routes);
  return (
    <RouterProvider router={router} />
  )
}

export default App
