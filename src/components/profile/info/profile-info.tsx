import { Button, Typography } from '@/components'
import { Edit } from '@/assets/icons/drop-down/edit.tsx'
import s from '../profile.module.scss'
import { useNavigate } from 'react-router-dom'
export const ProfileInfo = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className={s.nickNameContainer}>
        <Typography variant={'h1'} mr={3}>
          Nick Name
        </Typography>
        <Button
          variant={'primary'}
          type={'button'}
          className={s.editNickNameButton}
          onClick={() => navigate('edit')}
        >
          <Edit className={s.editNickNameIcon} />
        </Button>
      </div>
      <Typography variant={'body2'} color={'var(--color-dark-300)'}>
        a@a.com
      </Typography>
      <Button variant={'primaryWithIcon'} className={s.logOutButton}>
        LogOut
      </Button>
    </>
  )
}
