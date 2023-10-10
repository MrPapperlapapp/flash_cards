import { RouteObject } from 'react-router-dom'

import { EditProfile } from '../../features/auth/ui/profile/edit'
import { ProfileInfo } from '../../features/auth/ui/profile/info'

import { CheckEmail, CreateNewPassword, SignIn } from '@/components'
import { ForgotPassword } from '@/components/auth/forgot-password'
import { SignUp } from '@/components/auth/sign-up'
import { Packs } from '@/pages/pack-list/pack-list.tsx'
import { Profile } from '@/pages/profile'
import {Cards} from "@/pages/cards/cards.tsx";

export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/recover-password',
    element: <ForgotPassword />,
  },
  {
    path: '/recover-password/:token',
    element: <CreateNewPassword />,
  },
  {
    path: '/check-email',
    element: <CheckEmail />,
  },
]

export const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Packs />,
  },
  {
    path: '/:cardId',
    element: <Cards />,
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
