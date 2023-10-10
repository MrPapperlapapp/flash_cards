import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { z } from 'zod'

import s from './forgot-password.module.scss'

import { Card, ControlledTextField, Typography } from '@/components'
import { Button } from '@/components/ui/button'
import { useRecoveryPasswordMutation } from '@/features/auth/model/services/auth.ts'

const signUpSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
})

export type SignUpFormProps = z.infer<typeof signUpSchema>

export const ForgotPassword = () => {
  const [passRecovery, { isSuccess }] = useRecoveryPasswordMutation()
  const classes = clsx(s.card)

  const { control, handleSubmit, getValues, setError } = useForm<SignUpFormProps>({
    mode: 'onSubmit',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
    },
  })
  const onSubmit = () =>
    passRecovery({
      html: `"<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/recover-password/##token##">here</a> to recover your password</p>"`,
      email: getValues('email'),
      subject: 'Recovery Password',
    })
      .unwrap()
      .catch(() => setError('email', { message: 'Email not found' }))

  if (isSuccess) return <Navigate to={'/check-email'} state={{ email: getValues('email') }} />

  return (
    <>
      <Card className={classes}>
        <Typography variant="large" className={s.title}>
          Forgot your password?
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes}>
          <div className={s.form}>
            <ControlledTextField
              control={control}
              name={'email'}
              label={'Email'}
              className={s.email}
            />
            <Typography variant={'body2'} color={'var(--color-dark-300)'}>
              Enter your email address and we will send you further instructions
            </Typography>
          </div>
          <Button fullWidth className={s.button} type={'submit'}>
            Send Instructions
          </Button>
        </form>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Typography variant="body2" className={s.caption}>
          Did you remember your password?
        </Typography>
        <Typography variant="link1" as={Link} to="/login" className={s.signInLink}>
          Try logging in
        </Typography>
      </Card>
    </>
  )
}
