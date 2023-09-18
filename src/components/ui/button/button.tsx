import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import logout from './../../../assets/icons/logout.svg'
import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  variant?: 'primary' | 'primaryWithIcon' | 'secondary' | 'secondaryWithIcon' | 'tertiary' | 'link'
  fullWidth?: boolean
  disabled?: boolean
  className?: string
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    variant = 'primary',
    fullWidth,
    disabled,
    className,
    as: Component = 'button',
    children,
    ...rest
  } = props

  const classNames = clsx(s[variant], fullWidth && s.fullWidth, disabled && s.disabled, className)

  return (
    <>
      <Component className={classNames} {...rest}>
        {(variant === 'primaryWithIcon' || variant === 'secondaryWithIcon') && (
          <img src={logout} alt="Logout" className={s.icons} />
        )}{' '}
        {children}
      </Component>
    </>
  )
}
