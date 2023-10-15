import { FC } from 'react'

import { Link } from 'react-router-dom'

import s from './back-button.module.scss'

import ArrowBackOutline from '@/assets/icons/arrowBackOutline.tsx'
import { Button } from '@/components'

type Props = {
  title: string
  link: string
}

export const BackButton: FC<Props> = ({ title, link }) => {
  return (
    <div className={s.backLinkWrapper}>
      <Button className={s.backLink} variant={'link'} as={Link} to={link}>
        <>
          <ArrowBackOutline />
          {title}
        </>
      </Button>
    </div>
  )
}
