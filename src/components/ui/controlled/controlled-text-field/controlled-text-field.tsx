import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui'

type PropsType<TFieldProps extends FieldValues> = UseControllerProps<TFieldProps> &
  TextFieldProps &
  Omit<TextFieldProps, 'value' | 'onChange' | 'id'>
export const ControlledTextField = <TFieldProps extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...textFieldProps
}: PropsType<TFieldProps>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue,
    rules,
    shouldUnregister,
  })

  return (
    <TextField
      {...textFieldProps}
      value={value}
      id={name}
      onChange={onChange}
      errorMessage={error?.message}
    />
  )
}
