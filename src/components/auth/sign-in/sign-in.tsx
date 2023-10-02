import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { z } from 'zod'

import s from './sign-in.module.scss'

import { Button, ControlledTextField, Typography } from '@/components'
import { Card } from '@/components/ui/card'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox'
import { useGetMeQuery, useLogInMutation } from '@/services/auth/auth.ts'

const signInSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
  password: z.string().nonempty('Enter password'),
  rememberMe: z.boolean().optional(),
})

type SignInFormProps = z.infer<typeof signInSchema>

export const SignIn = () => {
  const { data: me } = useGetMeQuery()
  const [login] = useLogInMutation()
  const { handleSubmit, control } = useForm<SignInFormProps>({
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })
  if (!!me) return <Navigate to={'/'} />
  return (
    <>
      {/*{rhf dev tool}*/}
      <DevTool control={control} />
      {/*{rhf dev tool}*/}
      <Card className={s.card}>
        <Typography variant={'large'} className={s.title}>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit(login)}>
          <div className={s.textField}>
            <ControlledTextField
              placeholder={'Email'}
              label={'Email'}
              name={'email'}
              control={control}
            />
            <ControlledTextField
              placeholder={'Password'}
              label={'Password'}
              type={'password'}
              name={'password'}
              control={control}
            />
          </div>
          <ControlledCheckbox
            className={s.checkbox}
            control={control}
            name={'rememberMe'}
            label={'Remember me'}
          />
          <Typography
            variant={'body2'}
            as={Link}
            to="/recover-password"
            className={s.recoverPasswordLink}
          >
            Forgot Password?
          </Typography>
          <Button type="submit" fullWidth className={s.button}>
            Sign In
          </Button>
        </form>
        <Typography className={s.caption} variant="body2">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account?
        </Typography>
        <Typography variant="link1" as={Link} to="/sign-up" className={s.signUpLink}>
          Sign Up
        </Typography>
      </Card>
    </>
  )
}
