import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './button-icon.module.scss'

export type IconButtonProps = {
  children: ReactNode
  small?: boolean
} & Omit<ComponentPropsWithoutRef<'button'>, 'children'>

export const IconButton: FC<IconButtonProps> = ({ children, small, className, ...props }) => {
  const classes = clsx(s.button, small && s.small, className)

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  )
}
