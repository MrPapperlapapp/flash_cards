import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const packSchema = z.object({
  name: z.string().nonempty('Required').min(2, 'The name must be at least 2 characters'),
  isPrivate: z.boolean(),
  cover: z
    .instanceof(File)
    .refine(file => file.size <= 1000000, `Max image size is 1MB.`)
    .refine(
      file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
})

export type PackFormType = z.infer<typeof packSchema>

export const usePackForm = (props: PackFormType) => {
  const { control, watch, resetField, getFieldState, trigger, handleSubmit } =
    useForm<PackFormType>({
      resolver: zodResolver(packSchema),
      defaultValues: props,
    })

  return { control, watch, resetField, getFieldState, trigger, handleSubmit }
}
