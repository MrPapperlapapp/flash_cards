import { FC } from 'react'

import { useForm } from 'react-hook-form'

import s from './rate-card.module.scss'

import { Button, Option } from '@/components'
import { ControlledRadioGroup } from '@/components/ui/controlled/controlled-radio-group/controlled-radio-group.tsx'

const options: Option[] = [
  { label: 'Did not know', value: '1' },
  { label: 'Forgot', value: '2' },
  { label: 'A lot of thought', value: '3' },
  { label: 'Confused', value: '4' },
  { label: 'Knew the answer', value: '5' },
]

export type RateType = { grade: string }

type Props = {
  onSubmit: (data: RateType) => void
}

export const RateCardForm: FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<RateType>({
    defaultValues: { grade: '1' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.root}>
      <ControlledRadioGroup control={control} name="grade" options={options} />
      <Button fullWidth className={s.button}>
        Next Question
      </Button>
    </form>
  )
}
