import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { clsx } from 'clsx'

import s from './text-field.module.scss'

import { Close } from '@/assets/icons/text-field/close.tsx'
import { ClosedEye } from '@/assets/icons/text-field/closed-eye.tsx'
import { OpenedEye } from '@/assets/icons/text-field/opened-eye.tsx'
import { Search } from '@/assets/icons/text-field/search.tsx'
import { Typography } from '@/components/ui/typography'

export type TextFieldProps = {
  errorMessage?: string
  label?: string
  clearField?: () => void
  onValueChange?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, errorMessage, type, label, clearField, onValueChange, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const passwordType = type === 'password'
    const searchType = type === 'search'
    const displayClearButton = searchType && clearField && rest.value
    const classes = {
      root: clsx(s.root, className),
      label: clsx(s.label, rest.disabled && s.disabled),
      input: clsx(s.input, searchType && s.search, rest.value && s.filled, errorMessage && s.error),
      buttonCloseIcon: clsx(s.button, s.iconClose),
    }
    const searchIcon = `${s.searchIcon} ${rest.disabled && s.disabledIcon} ${
      rest.value && s.filledIcon
    }`
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(e.target.value)
    }

    return (
      <div className={classes.root}>
        <Typography as={'label'} variant={'body2'} className={classes.label}>
          {label}{' '}
          <div className={s.textFieldContainer}>
            <input
              className={classes.input}
              ref={ref}
              type={passwordType && showPassword ? 'text' : type}
              onChange={handleChange}
              {...rest}
            />
            {passwordType && (
              <button
                className={s.button}
                type={'button'}
                onClick={() => {
                  setShowPassword(e => !e)
                }}
                disabled={rest.disabled}
              >
                {showPassword ? <OpenedEye /> : <ClosedEye />}
              </button>
            )}
            {searchType && <Search className={searchIcon} />}
            {displayClearButton && (
              <button type={'button'} onClick={clearField} className={classes.buttonCloseIcon}>
                <Close />
              </button>
            )}
          </div>
        </Typography>
        {errorMessage && (
          <Typography variant={'caption'} className={s.errorMessage}>
            {errorMessage}{' '}
          </Typography>
        )}
      </div>
    )
  }
)
