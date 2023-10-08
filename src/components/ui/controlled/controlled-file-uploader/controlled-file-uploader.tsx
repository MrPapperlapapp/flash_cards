import { ChangeEvent, useRef } from 'react'

import { clsx } from 'clsx'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import s from './controlled-file-uploader.module.scss'

import { Edit } from '@/assets/icons/drop-down/edit.tsx'
import { Button, ButtonProps } from '@/components'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  extraActions?: (inputName: string) => void
} & Omit<ButtonProps, 'type' | 'onClick'>

export const ControlledFileUploader = <T extends FieldValues>({
  name,
  control,
  className,
  children,
  extraActions,
  ...restProps
}: Props<T>) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    field: { onChange },
  } = useController({
    name,
    control,
  })

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files?.[0])
    extraActions?.(name)
  }

  const classes = clsx(s.wrapper, className)

  return (
    <>
      <Button
        onClick={() => inputRef?.current?.click()}
        className={classes}
        type="button"
        {...restProps}
      >
        {children ?? <Edit className={s.icon} />}
      </Button>
      <input
        name={name}
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={changeHandler}
      />
    </>
  )
}
