import { RouteObject } from 'react-router-dom'

import { Decks } from '@/pages/decks/decks.tsx'
import { Profile } from '@/pages/profile'
import { ProfileInfo } from '@/pages/profile/info'
import { EditProfile } from '@/pages/profile/edit'
import { SignIn } from '@/components'
import { SignUp } from '@/components/auth/sign-up'

export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
]

export const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
  {
    path: '/profile',
    element: <Profile />,
    children: [
      {
        path: '/profile',
        element: <ProfileInfo />,
      },
      {
        path: 'edit',
        element: <EditProfile />,
      },
    ],
  },
]
