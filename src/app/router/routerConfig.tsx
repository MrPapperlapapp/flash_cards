import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'

import { privateRoutes, publicRoutes } from '@/app/router/routes.tsx'
import { Layout } from '@/components/layout'
import { useGetMeQuery } from '@/features/auth/model/services/auth.ts'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={routes} />
}
function PrivateRoutes() {
  const { data: me } = useGetMeQuery()
  const isAuthenticated = !!me

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
