import { FC, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

type CardPropsType = {
  children: ReactNode
  className?: string
}

export const Card: FC<CardPropsType> = ({ children, className }) => {
  const style = clsx(className, s.card)

  return <div className={style}>{children}</div>
}
