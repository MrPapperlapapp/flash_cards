import { Button, Card, Typography } from '@/components'
import { Avatar } from '@/components/ui/avatar'
import { Edit } from '@/assets/icons/drop-down/edit.tsx'
import s from './profile.module.scss'
import EditProfile from '@/components/profile/edit-profile.tsx'
import { ProfileBody } from '@/components/profile/profile-body.tsx'

export const Profile = ({ onSubmit, isEdit }: ProfileProps) => {
  return (
    <Card className={s.profileContainer}>
      <Typography variant={'large'} mb={27}>
        Personal Information
      </Typography>
      <div className={s.avatarContainer}>
        <Avatar
          userName={'Hallo'}
          size={96}
          image={
            'https://t4.ftcdn.net/jpg/02/85/46/81/240_F_285468179_nY3iZePEB0ymN6s7LjI1lK9o90VwS6m5.jpg'
          }
          className={s.avatar}
        />
        <Button variant={'secondary'} className={s.editAvatarButton}>
          <Edit className={s.editAvatarIcon} />
        </Button>
      </div>
      <div className={s.body}>
        {isEdit ? <EditProfile onSubmit={onSubmit} /> : <ProfileBody onSubmit={onSubmit} />}
      </div>
    </Card>
  )
}

type ProfileProps = {
  onSubmit: () => void
  isEdit: boolean
}
