import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { getAccessibleRoutes } from "./utils/route.helpers";


function App() {
  const routes = getAccessibleRoutes([])
    .map(route => ({
        path: route.path,
        element: <route.component />,
    }));

  const router = createBrowserRouter(routes);
  return (
    <RouterProvider router={router} />
  )
}

export default App
