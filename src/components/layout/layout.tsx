import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { Header } from '@/components/ui/header'
import { useGetMeQuery, useLogOutMutation } from '@/services/auth/auth.ts'
export const Layout = () => {
  const { data, isLoading } = useGetMeQuery()
  const [logout] = useLogOutMutation()

  return (
    <>
      <Header
        data={data && { name: data.name, avatar: data.avatar, email: data.email }}
        logout={logout}
      />
      <div className={s.content}>{isLoading ? <div> Loading...</div> : <Outlet />}</div>
    </>
  )
}
