import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as LabelRadix from '@radix-ui/react-label'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

import { Typography } from '@/components/ui'

type Option = {
  label: string
  value: string
}

type RadioGroupType = {
  options: Option[]
  name?: string
  value?: string
  required?: boolean
  disabled?: boolean
  defaultValue?: string
  onValueChange?: (val: string) => void
}

export const RadioGroup = ({ options, onValueChange, ...rest }: RadioGroupType) => {
  return (
    <RadioGroupRoot onValueChange={onValueChange} {...rest}>
      {options.map(el => (
        <RadioGroupItem key={el.value} value={el.value} label={el.label}></RadioGroupItem>
      ))}
    </RadioGroupRoot>
  )
}

const RadioGroupRoot = forwardRef<
  ElementRef<typeof RadixRadioGroup.Root>,
  ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>
>(({ className, ...rest }, ref) => {
  return <RadixRadioGroup.Root className={s.root} ref={ref} {...rest} />
})

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadixRadioGroup.Item>,
  ComponentPropsWithoutRef<typeof RadixRadioGroup.Item> & { label?: string }
>(({ className, label, ...rest }, ref) => {
  return (
    <LabelRadix.Root className={s.label}>
      <div className={s.wrapper}>
        <RadixRadioGroup.Item ref={ref} className={s.item} {...rest}>
          <RadixRadioGroup.Indicator className={s.indicator} />
        </RadixRadioGroup.Item>
      </div>
      {label && (
        <Typography className={s.label_text} variant={'body2'}>
          {label}
        </Typography>
      )}
    </LabelRadix.Root>
  )
})
