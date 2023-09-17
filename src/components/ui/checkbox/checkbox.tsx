import { FC } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'
import {CheckedIcon} from "@/assets/icons/checkedIcon.tsx";
import {UncheckedIcon} from "@/assets/icons/uncheckedIcon.tsx";

export type CheckboxProps = {
    checked?: boolean
    onValueChange?: (checked: boolean) => void
    disabled?: boolean
    required?: boolean
    label?: string
    id?: string
    className?: string
}
export const Checkbox: FC<CheckboxProps> = ({
                                                checked,
                                                onValueChange,
                                                disabled,
                                                required,
                                                label,
                                                id,
                                                className,
                                            }) => {
    const classNames = {
        container: clsx(s.container, className),
        label: s.label,
        root: s.root,
        indicator: s.indicator,
        icon: s.icon,
        labelText: s.labelText,
    }

    return (
        <div className={classNames.container}>
            <LabelRadix.Root className={classNames.label}>
                <CheckboxRadix.Root
                    className={classNames.root}
                    checked={checked}
                    onCheckedChange={onValueChange}
                    disabled={disabled}
                    required={required}
                    id={id}
                >
                    <CheckboxRadix.Indicator className={classNames.indicator} asChild forceMount>
                        <div className={classNames.icon}>{checked ? <CheckedIcon /> : <UncheckedIcon />}</div>
                    </CheckboxRadix.Indicator>
                </CheckboxRadix.Root>

                <span className={classNames.labelText}>{label}</span>
            </LabelRadix.Root>
        </div>
    )
}
