import { Navigate } from 'react-router-dom'

import { SignIn } from '@/components'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'

export const SignInPage = () => {
  //const [login] = useLoginMutation()
  const { data: me } = useGetMeQuery()

  if (me && me?.success !== false) return <Navigate to={'/'} />

  return <SignIn />
}
