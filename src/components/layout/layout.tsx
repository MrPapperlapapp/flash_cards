import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { Header } from '@/components/ui/header'
export const Layout = () => {
  return (
    <>
      <Header data={{ avatar: '', email: '', name: '' }} logout={() => {}} />
      <div className={s.content}>
        <Outlet />
      </div>
    </>
  )
}