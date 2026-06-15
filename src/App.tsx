import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { getAccessibleRoutes } from "@/utils/route.helpers";
import {authApiHooks} from '@/services'
import { useThemeMode, useAppSelector } from "@/hooks";
import { Loader } from "@/components/Common/Loader";

function App() {
  useThemeMode();
  const {user, isLoading, isAuthenticated, authChecked} = useAppSelector((state) => state.auth);
  const shouldSkipRefetchingData = authChecked || isAuthenticated;
  authApiHooks.useMeQuery(undefined, {
    skip: shouldSkipRefetchingData,
  })
  
  if(isLoading && (!isAuthenticated || !authChecked)){
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
