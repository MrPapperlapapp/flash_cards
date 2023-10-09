import { Button, Typography } from '@/components'
import { Edit } from '@/assets/icons/drop-down/edit.tsx'
import s from '../../../../../pages/profile/profile.module.scss'
import { useNavigate } from 'react-router-dom'
import { useGetMeQuery, useLogOutMutation } from '@/features/auth/model/services/auth.ts'

export const ProfileInfo = () => {
  const { data } = useGetMeQuery()
  const [logout] = useLogOutMutation()
  const navigate = useNavigate()
  return (
    <>
      <div className={s.nickNameContainer}>
        <Typography variant={'h1'} mr={3}>
          {data?.name}
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
        {data?.email}
      </Typography>
      <Button variant={'primaryWithIcon'} className={s.logOutButton} onClick={() => logout()}>
        LogOut
      </Button>
    </>
  )
}
