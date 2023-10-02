import { Button, ControlledTextField } from '@/components'
import s from '../profile.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useGetMeQuery } from '@/services/auth/auth.ts'

const profileSchema = z.object({
  nickName: z.string().min(3, 'Min 3 Chars').nonempty('Pls enter Name'),
})

type ProfileFormProps = z.infer<typeof profileSchema>

export const EditProfile = () => {
  const navigate = useNavigate()
  const { data } = useGetMeQuery()
  const { handleSubmit, control } = useForm<ProfileFormProps>({
    mode: 'onSubmit',
    defaultValues: {
      nickName: data.name,
    },
    resolver: zodResolver(profileSchema),
  })

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <div className={s.edit}>
        <ControlledTextField name={'nickName'} control={control} />
        <Button variant={'primary'} fullWidth onClick={() => navigate('/profile')}>
          Save
        </Button>
      </div>
    </form>
  )
}
