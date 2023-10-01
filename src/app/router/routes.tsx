import { RouteObject } from 'react-router-dom'

import { Decks } from '@/pages/decks/decks.tsx'

export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
  },
]

export const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
]
