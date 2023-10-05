import { RouteObject } from 'react-router-dom'

import { Packs } from '@/pages/pack-list/pack-list.tsx'

export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
  },
]

export const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Packs />,
  },
]
