import { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

export const Typography = <T extends ElementType = 'span'>(props: PureProps<T>) => {
  const {
    as,
    variant = 'body1',
    children,
    className,
    style,
    color,
    mt,
    mb,
    ml,
    mr,
    mx,
    my,
    ...rest
  } = props

  const styles = {
    ...(mt && { marginTop: mt }),
    ...(mb && { marginBottom: mb }),
    ...(mr && { marginRight: mr }),
    ...(ml && { marginLeft: ml }),
    ...(mx && { marginRight: mx, marginLeft: mx }),
    ...(my && { marginTop: my, marginBottom: my }),
    ...(color && { color: color }),
    ...style,
  }

  const classNames = clsx(s[variant], className)

  const Component = as || COMPONENTS[variant] || 'span'

  return (
    <Component className={classNames} style={styles} {...rest}>
      {children}
    </Component>
  )
}

type VariantType =
  | 'large'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body1'
  | 'body2'
  | 'subtitle1'
  | 'subtitle2'
  | 'caption'
  | 'overline'
  | 'link1'
  | 'link2'

type TypographyProps<T extends ElementType> = {
  as?: T
  variant?: VariantType
  className?: string
  children: ReactNode
  color?: CSSProperties['color']
  mt?: CSSProperties['marginTop']
  mb?: CSSProperties['marginBottom']
  ml?: CSSProperties['marginLeft']
  mr?: CSSProperties['marginRight']
  mx?: CSSProperties['marginRight']
  my?: CSSProperties['marginRight']
}
type PureProps<T extends ElementType> = TypographyProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>

const COMPONENTS = {
  large: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body1: 'p',
  body2: 'p',
  subtitle1: 'p',
  subtitle2: 'p',
  overline: 'p',
  caption: 'span',
  link1: 'a',
  link2: 'a',
} as const
