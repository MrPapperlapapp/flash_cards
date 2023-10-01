import s from './profile.module.scss'

import { Edit } from '@/assets/icons/drop-down/edit.tsx'
import { Button, Card, Typography } from '@/components'
import { Avatar } from '@/components/ui/avatar'

export const Profile = ({ name, avatarImg, title, email }: ProfileProps) => {
  return (
    <Card className={s.profileContainer}>
      <Typography variant={'large'} mb={27}>
        {title}
      </Typography>
      <div className={s.avatarContainer}>
        <Avatar userName={'Hallo'} size={96} image={avatarImg} className={s.avatar} />
        <Button variant={'secondary'} className={s.editAvatarButton}>
          <Edit className={s.editAvatarIcon} />
        </Button>
      </div>
      <div className={s.nickNameContainer}>
        <Typography variant={'h1'} mr={3}>
          {name}
        </Typography>
        <Button variant={'primary'} className={s.editNickNameButton}>
          <Edit className={s.editNickNameIcon} />
        </Button>
      </div>
      <Typography variant={'body2'} color={'var(--color-dark-300)'}>
        {email}
      </Typography>
      <Button variant={'primaryWithIcon'} className={s.logOutButton}>
        LogOut
      </Button>
    </Card>
  )
}

type ProfileProps = {
  title: string
  avatarImg: string
  name: string
  email: string
}
