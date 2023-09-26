import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { BrowserRouter, Link } from 'react-router-dom'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { Card, ControlledTextField, Typography } from '@/components'
import { Button } from '@/components/ui/button'

const signUpSchema = z
  .object({
    email: z.string().email('Invalid email address').nonempty('Enter email'),
    password: z.string().nonempty('Enter password'),
    confirmPassword: z.string().nonempty('Confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignUpFormProps = z.infer<typeof signUpSchema>

type Props = {
  onSubmit: (data: SignUpFormProps) => void
  className?: string
}

export const SignUp = ({ onSubmit, className }: Props) => {
  const classes = clsx(s.card, className)

  const { control, handleSubmit } = useForm<SignUpFormProps>({
    mode: 'onSubmit',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <>
      <DevTool control={control} />
      <Card className={classes}>
        <Typography variant="large" className={s.title}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes}>
          <div className={s.form}>
            <ControlledTextField
              control={control}
              name={'email'}
              label={'Email'}
              className={s.email}
            />
            <ControlledTextField
              control={control}
              name={'password'}
              label={'Password'}
              type="password"
              className={s.password}
            />
            <ControlledTextField
              control={control}
              name={'confirmPassword'}
              label={'Confirm Password'}
              type="password"
            />
          </div>
          <Button fullWidth className={s.button} type={'submit'}>
            Sign Up
          </Button>
        </form>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Typography variant="body2" className={s.caption}>
          Already have an account?
        </Typography>
        <BrowserRouter>
          <Typography variant="link1" as={Link} to="/sign-in" className={s.signInLink}>
            Sign In
          </Typography>
        </BrowserRouter>
      </Card>
    </>
  )
}
