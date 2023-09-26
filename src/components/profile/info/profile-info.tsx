import { Button, Typography } from '@/components'
import { Edit } from '@/assets/icons/drop-down/edit.tsx'
import s from '../profile.module.scss'
export const ProfileInfo = ({ onSubmit }: any) => {
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
          onClick={onSubmit}
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
