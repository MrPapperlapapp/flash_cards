import { Button, Card, Typography } from '@/components'
import { Avatar } from '@/components/ui/avatar'
import { Edit } from '@/assets/icons/drop-down/edit.tsx'

import s from './profile.module.scss'
import { Outlet } from 'react-router-dom'
import { useGetMeQuery } from '@/services/auth/auth.ts'

export const Profile = () => {
  const { data } = useGetMeQuery()

  return (
    <Card className={s.profileContainer}>
      <Typography variant={'large'} mb={27}>
        Personal Information
      </Typography>
      <div className={s.avatarContainer}>
        <Avatar userName={data!.name} size={96} image={data?.avatar} className={s.avatar} />
        <Button variant={'secondary'} className={s.editAvatarButton}>
          <Edit className={s.editAvatarIcon} />
        </Button>
      </div>
      <div className={s.body}>
        <Outlet />
      </div>
    </Card>
  )
}
