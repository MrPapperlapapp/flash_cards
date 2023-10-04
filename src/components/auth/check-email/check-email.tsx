import s from './check-email.module.scss'

import CheckEmailLogo from '@/assets/icons/checkEmailLogo.tsx'
import { Button, Card, Typography } from '@/components'
import { Navigate, useLocation } from 'react-router-dom'

export const CheckEmail = () => {
  const location = useLocation()
  if (!location.state.email.length) return <Navigate to={'/login'} />
  return (
    <Card className={s.card}>
      <Typography variant={'large'} as={'h1'} className={s.title}>
        Check Email
      </Typography>
      <div className={s.logo}>
        <CheckEmailLogo />
      </div>
      <div className={s.message}>
        <Typography variant={'body2'} color={'secondary'}>
          We’ve sent an Email with instructions to
        </Typography>
        <Typography variant={'body2'} color={'secondary'}>
          {location.state.email}
        </Typography>
      </div>
      <Button variant={'primary'} as={'a'} href={'/sign-in'} fullWidth={true} className={s.button}>
        Back to Sign In
      </Button>
    </Card>
  )
}
