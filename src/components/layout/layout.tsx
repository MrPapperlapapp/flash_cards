import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { Header } from '@/components/ui/header'
import { useGetMeQuery } from '@/services/auth/auth.ts'
export const Layout = () => {
  const { data, isLoading } = useGetMeQuery()
  return (
    <>
      <Header data={data && data} logout={() => {}} />
      <div className={s.content}>{isLoading ? <div> Loading...</div> : <Outlet />}</div>
    </>
  )
}
