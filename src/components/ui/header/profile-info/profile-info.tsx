import { ElementRef, forwardRef } from 'react'

import s from './profile-info.module.scss'

import { Typography } from '@/components/ui'
import { Avatar } from '@/components/ui/avatar'

export type ProfileInfoPropsType = {
  avatar: string
  email: string
  name: string
}

export const ProfileInfo = forwardRef<ElementRef<'div'>, ProfileInfoPropsType>(
  ({ avatar, name, email }, ref) => {
    return (
      <div className={s.content} ref={ref}>
        <Avatar userName={name} image={avatar} className={s.avatar} />
        <div>
          <Typography variant="subtitle2">{name}</Typography>
          <Typography variant="caption" className={s.email}>
            {email}
          </Typography>
        </div>
      </div>
    )
  }
)
