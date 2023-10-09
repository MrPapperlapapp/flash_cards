import { Button, Card, TextField, Typography } from '@/components'
import { Avatar } from '@/components/ui/avatar'
import { Edit } from '@/assets/icons/drop-down/edit.tsx'

import s from './profile.module.scss'
import { Outlet } from 'react-router-dom'
import { useGetMeQuery, useUpdateProfileMutation } from '@/features/auth/model/services/auth.ts'
import { Label } from '@radix-ui/react-label'
import { ChangeEvent, useRef } from 'react'

export const Profile = () => {
  const { data } = useGetMeQuery()
  const [uploadAvatar] = useUpdateProfileMutation()
  const inputRef = useRef<HTMLInputElement>(null)
  const onFileLoad = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && e.target.files[0] && uploadAvatar({ avatar: e.target.files[0] })
  }

  return (
    <Card className={s.profileContainer}>
      <Typography variant={'large'} mb={27}>
        Personal Information
      </Typography>
      <div className={s.avatarContainer}>
        <Avatar userName={data!.name} size={96} image={data?.avatar} className={s.avatar} />
        <Label className={s.editAvatarLabel}>
          <Button
            variant={'secondary'}
            className={s.editAvatarButton}
            type={'button'}
            onClick={() => inputRef?.current?.click()}
          >
            <Edit className={s.editAvatarIcon} />
          </Button>
          <TextField
            type="file"
            ref={inputRef}
            accept="image/png, image/jpeg"
            className={s.editAvatarInput}
            onChange={onFileLoad}
          />
        </Label>
      </div>
      <div className={s.body}>
        <Outlet />
      </div>
    </Card>
  )
}
