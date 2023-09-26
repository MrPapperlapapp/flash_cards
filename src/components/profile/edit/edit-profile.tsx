import { Button, ControlledTextField } from '@/components'
import s from '../profile.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const profileSchema = z.object({
  nickName: z.string().min(3, 'Min 3 Chars').nonempty('Pls enter Name'),
})

type ProfileFormProps = z.infer<typeof profileSchema>
const EditProfile = ({ onSubmit }: any) => {
  const {
    handleSubmit,
    control,
    formState: {isValid },
  } = useForm<ProfileFormProps>({
    mode: 'onSubmit',
    defaultValues: {
      nickName: '',
    },
    resolver: zodResolver(profileSchema),
  })

  const submitHandler = () => isValid && onSubmit

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.edit}>
        <ControlledTextField name={'nickName'} control={control} />
        <Button variant={'primary'} fullWidth onClick={submitHandler}>
          Save
        </Button>
      </div>
    </form>
  )
}

export default EditProfile
