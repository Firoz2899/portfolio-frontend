import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { getAccessibleRoutes } from "./utils/route.helpers";
import {authApiHooks} from '@/services'
import { useAppSelector } from "./hooks";
import { localStorageKeys } from "./constants";
import { useThemeMode } from "./hooks/useThemeMode";
import { Loader } from "./components/Common/Loader";

function App() {
  useThemeMode();
  const token = localStorage.getItem(localStorageKeys.accessToken);
  const {user, isLoading, isAuthenticated} = useAppSelector((state) => state.auth);
  authApiHooks.useMeQuery(undefined, {
    skip: !token || !!user,
  })
  
  if(isLoading && !isAuthenticated){
    return <Loader/>
  }

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
