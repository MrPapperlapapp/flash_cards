import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './create-new-password.module.scss'
import { createNewPasswordSchema } from './schema.ts'

import { Button, Card, ControlledTextField, Typography } from '@/components'

type PropsType = {
  onSubmit: (data: Form) => void
}
type Form = z.infer<typeof createNewPasswordSchema>

const defaultValues: Form = {
  newPassword: '',
}

export const CreateNewPassword: FC<PropsType> = ({ onSubmit }) => {
  const { control, handleSubmit, reset } = useForm<Form>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: 'onSubmit',
    defaultValues,
  })
  const onSubmitForm = handleSubmit(data => {
    onSubmit({ newPassword: data.newPassword })
    reset(defaultValues)
  })

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
