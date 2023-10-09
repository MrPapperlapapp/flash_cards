import { Button, ControlledTextField } from '@/components'
import s from '../../../../../pages/profile/profile.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useGetMeQuery, useUpdateProfileMutation } from '@/features/auth/model/services/auth.ts'

const profileSchema = z.object({
  nickName: z.string().min(3, 'Min 3 Chars').nonempty('Pls enter Name'),
})

type ProfileFormProps = z.infer<typeof profileSchema>

export const EditProfile = () => {
  const navigate = useNavigate()
  const { data } = useGetMeQuery()
  const [updateUserInfo, { isLoading }] = useUpdateProfileMutation()
  const { handleSubmit, control, getValues } = useForm<ProfileFormProps>({
    mode: 'onSubmit',
    defaultValues: {
      nickName: data?.name || '',
    },
    resolver: zodResolver(profileSchema),
  })
  const onSubmit = () => {
    updateUserInfo({ name: getValues('nickName'), email: data!.email })
    navigate('/profile')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.edit}>
        <ControlledTextField name={'nickName'} control={control} />
        <Button variant={'primary'} fullWidth disabled={isLoading}>
          Save
        </Button>
      </div>
    </form>
  )
}
