import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'
import * as LabelRadix from '@radix-ui/react-label'

type Option = {
    label: string
    value: string
}
type RadioGroupType = {
    options: Option[]
}

export const RadioGroup = ({options}:RadioGroupType) => {
    return (
        <RadioGroupRoot>
            {options.map(el => <RadioGroupItem value={el.value} label={el.label}></RadioGroupItem>)}
        </RadioGroupRoot>
    )
}

export const RadioGroupRoot = forwardRef<
  ElementRef<typeof RadixRadioGroup.Root>,
  ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>
>(({ className, ...rest }, ref) => {
  return <RadixRadioGroup.Root className={s.root} ref={ref} {...rest} />
})

export const RadioGroupItem = forwardRef<
  ElementRef<typeof RadixRadioGroup.Item>,
  ComponentPropsWithoutRef<typeof RadixRadioGroup.Item> & {label?: string}
>(({ className,label, ...rest }, ref) => {
  return (
      <LabelRadix.Root className={s.label}>
        <RadixRadioGroup.Item ref={ref} className={s.item} {...rest}>
          <RadixRadioGroup.Indicator className={s.indicator}/>
        </RadixRadioGroup.Item>
          <span>{label}</span>
      </LabelRadix.Root>
  )
})
