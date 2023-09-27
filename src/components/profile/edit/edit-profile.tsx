import { Button, ControlledTextField } from '@/components'
import s from '../profile.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { navigate } from '@storybook/addon-links'

const profileSchema = z.object({
  nickName: z.string().min(3, 'Min 3 Chars').nonempty('Pls enter Name'),
})

type ProfileFormProps = z.infer<typeof profileSchema>

type OutletContextType = {
  onSubmit: () => void
}
const EditProfile = () => {
  const navigate = useNavigate()
  const { onSubmit } = useOutletContext<OutletContextType>()
  const { handleSubmit, control } = useForm<ProfileFormProps>({
    mode: 'onSubmit',
    defaultValues: {
      nickName: '',
    },
    resolver: zodResolver(profileSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.edit}>
        <ControlledTextField name={'nickName'} control={control} />
        <Button variant={'primary'} fullWidth onClick={() => navigate('/')}>
          Save
        </Button>
      </div>
    </form>
  )
}

export default EditProfile
