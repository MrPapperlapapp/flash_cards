import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupType } from '@/components'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<RadioGroupType, 'onValueChange' | 'value'>

export const ControlledRadioGroup = <T extends FieldValues>({
  name,
  control,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <RadioGroup
      errorMessage={error?.message}
      onValueChange={onChange}
      value={value}
      name={name}
      {...rest}
    />
  )
}
