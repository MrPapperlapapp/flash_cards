import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'
import { z } from 'zod'

import s from './create-new-password.module.scss'
import { createNewPasswordSchema } from './schema.ts'

import { Button, Card, ControlledTextField, Typography } from '@/components'
import { useResetPasswordMutation } from '@/features/auth/model/services/auth.ts'

type Form = z.infer<typeof createNewPasswordSchema>

const defaultValues: Form = {
  newPassword: '',
}

export const CreateNewPassword = () => {
  const { token } = useParams()

  const [resPass, { isSuccess }] = useResetPasswordMutation()
  const { control, handleSubmit, reset } = useForm<Form>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: 'onSubmit',
    defaultValues,
  })
  const onSubmitForm = handleSubmit(data => {
    token && data.newPassword && resPass({ token, password: data.newPassword })
    reset(defaultValues)
  })

  if (isSuccess) return <Navigate to={'/login'} />

  return (
    <Card className={s.card}>
      <Typography variant={'large'} as={'h1'} className={s.title}>
        Create new password
      </Typography>
      <form onSubmit={onSubmitForm}>
        <ControlledTextField
          control={control}
          title={'Password'}
          type={'password'}
          className={s.password}
          name={'newPassword'}
        />
        <Typography variant={'body2'} color={'secondary'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button className={s.button} fullWidth type={'submit'}>
          Create new password
        </Button>
      </form>
    </Card>
  )
}
