import { FC, memo } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import s from './header.module.scss'

import { User } from '@/assets/icons/drop-down/user.tsx'
import { Logout } from '@/assets/icons/logout.tsx'
import { Logo } from '@/assets/logo/logo.tsx'
import { Button, Typography } from '@/components/ui'
import { Avatar } from '@/components/ui/avatar'
import { DropDown, DropDownItem, DropDownItemWithIcon } from '@/components/ui/drop-down'
import { ProfileInfo, ProfileInfoPropsType } from '@/components/ui/header/profile-info'

type Props = {
  data: ProfileInfoPropsType | null
  logout: () => void
}

export const Header: FC<Props> = memo(({ data, logout }) => {
  const navigate = useNavigate()

  const toProfile = () => {
    navigate('/profile')
  }

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Link to="/" className={s.link}>
          <Logo className={s.logo} />
        </Link>
        {data ? (
          <div className={s.user}>
            <Typography variant="subtitle1" className={s.name}>
              {data.name || data.email}
            </Typography>
            <DropDown
              trigger={
                <button className={s.dropdownButton}>
                  <Avatar userName={data.name || data.email} image={data.avatar} />
                </button>
              }
            >
              <DropDownItem>
                <ProfileInfo {...data} />
              </DropDownItem>
              <DropDownItemWithIcon icon={<User />} text="Profile" onSelect={toProfile} />
              <DropDownItemWithIcon icon={<Logout />} text="Sign out" onSelect={logout} />
            </DropDown>
          </div>
        ) : (
          <Button as={Link} to="/sign-in">
            Sign In
          </Button>
        )}
      </div>
    </div>
  )
})
