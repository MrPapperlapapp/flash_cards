import { FC, Fragment, useMemo, CSSProperties } from 'react'

import { Listbox } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'

import s from './select.module.scss'

import { Scrollbar, Typography } from '@/components/ui'

export default {}
type Option =
  | { label: string; value: string }
  | { label: string; value: number }
  | { label: number; value: string }
  | { label: number; value: number }

interface CommonProps {
  className?: string
  disabled?: boolean
  name?: string
  placeholder?: string
  required?: boolean
  options: Array<Option>
  portal?: boolean
  errorMessage?: string
  label?: string
  width?: CSSProperties['width']
  rootClassName?: string
}

type ConditionalMultipleProps =
  | {
      multiple?: false
      value: string
      onChange: (value: string) => void
    }
  | {
      multiple?: false
      value: number
      onChange: (value: number) => void
    }
  | {
      multiple?: true
      value: Array<string>
      onChange: (value: Array<string>) => void
    }
  | {
      multiple?: true
      value: Array<number>
      onChange: (value: Array<number>) => void
    }

export type SelectProps = CommonProps & ConditionalMultipleProps

export const Select: FC<SelectProps> = ({
  placeholder,
  value,
  errorMessage,
  disabled,
  className,
  onChange,
  options,
  multiple = false,
  portal = true,
  label,
  rootClassName,
  width = '100%',
}) => {
  const showError = !!errorMessage && errorMessage.length > 0

  const optionsMap: Record<string | number, string | number> = useMemo(() => {
    return options.reduce(
      (acc, option) => {
        acc[option.value] = option.label

        return acc
      },
      {} as Record<string | number, string | number>
    )
  }, [options])

  const classNames = {
    root: rootClassName,
    trigger: clsx(s.trigger, showError && s.error, className),
    value: clsx(s.value),
    icon: clsx(s.icon),
    item: clsx(s.item),
    popper: clsx(s.popper),
    content: clsx(s.content),
    scrollRoot: s.scrollRoot,
    scrollViewport: s.scrollViewport,
    scrollbar: s.scrollbar,
    scrollThumb: s.scrollThumb,
    label: s.label,
  }
  const selectedOptionsLabels = Array.isArray(value)
    ? value.map(v => optionsMap[v]).join(', ')
    : optionsMap[value]

  const rootStyles = { width }

  return (
    <Listbox {...{ disabled, value, multiple, onChange }}>
      <div className={classNames.root} style={rootStyles}>
        <Typography className={s.label} variant={'body2'}>
          {label}
        </Typography>
        <Float
          portal={portal}
          as="div"
          adaptiveWidth
          placement="bottom"
          floatingAs={Fragment}
          className={s.float}
        >
          <Listbox.Button className={classNames.trigger} type={'button'}>
            <span className={classNames.value}>{selectedOptionsLabels || placeholder}</span>
            <span className={classNames.icon}>
              <ChevronDownIcon />
            </span>
          </Listbox.Button>

          <Listbox.Options className={classNames.content} as={'div'}>
            <Scrollbar maxHeight={180}>
              {options.map(option => {
                return (
                  <Listbox.Option
                    key={option.value}
                    className={classNames.item}
                    value={option.value}
                    as={'button'}
                    type={'button'}
                  >
                    <Typography variant={'body1'}>{option.label}</Typography>
                  </Listbox.Option>
                )
              })}
            </Scrollbar>
          </Listbox.Options>
        </Float>
      </div>
    </Listbox>
  )
}
