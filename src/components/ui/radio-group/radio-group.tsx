import {ComponentPropsWithoutRef, ElementRef, forwardRef} from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'
import * as LabelRadix from '@radix-ui/react-label'
import {Typography} from "@/components/ui";

type Option = {
    label: string
    value: string
}
type RadioGroupType = {
    options: Option[]
    name?: string
}

export const RadioGroup = ({options}: RadioGroupType) => {
    return (
        <RadioGroupRoot>
            {options.map(el => <RadioGroupItem key={el.value} value={el.value} label={el.label}></RadioGroupItem>)}
        </RadioGroupRoot>
    )
}

export const RadioGroupRoot = forwardRef<ElementRef<typeof RadixRadioGroup.Root>,
    ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>>(({className, ...rest}, ref) => {
    return <RadixRadioGroup.Root className={s.root} ref={ref} {...rest} />
})

export const RadioGroupItem = forwardRef<ElementRef<typeof RadixRadioGroup.Item>,
    ComponentPropsWithoutRef<typeof RadixRadioGroup.Item> & { label?: string }>(({className, label, ...rest}, ref) => {
    return (
        <LabelRadix.Root className={s.label}>
            <div className={s.wrapper}>
                <RadixRadioGroup.Item ref={ref} className={s.item} {...rest}>
                    <RadixRadioGroup.Indicator className={s.indicator}/>
                </RadixRadioGroup.Item>
            </div>
            {label && <Typography variant={"body2"}>{label}</Typography>}
        </LabelRadix.Root>
    )
})
