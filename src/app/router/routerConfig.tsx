import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'

import { privateRoutes, publicRoutes } from '@/app/router/routes.tsx'

const routes = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={routes} />
}
function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
