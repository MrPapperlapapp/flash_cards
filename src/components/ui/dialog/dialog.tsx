import { FC, ReactNode } from 'react'

import s from './dialog.module.scss'

import { Button, Modal, Typography } from '@/components'

type Props = {
  children?: ReactNode
  description: string
  buttonText?: string
  open: boolean
  setOpen: (value: boolean) => void
  onConfirm: () => void
  splitLines?: boolean
  title: string
}

export const Dialog: FC<Props> = ({
  description,
  buttonText,
  open,
  setOpen,
  onConfirm,
  splitLines,
  title,
}) => {
  const formattedDescription = splitLines ? formatTextBr(description) : description

  const onCancel = () => {
    setOpen(false)
  }

  return (
    <Modal
      isOpen={open}
      onClose={onCancel}
      title={title}
      className={s.modal}
      showCloseButton={open}
    >
      <Typography className={s.typography}>{formattedDescription}</Typography>
      <div className={s.buttons}>
        <Button variant="secondary" onClick={onCancel} className={s.button}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>{buttonText || 'Confirm'}</Button>
      </div>
    </Modal>
  )
}

export const formatTextBr = (message: string) => {
  const punctuationIndex = message.search(/[?.!]/)

  if (punctuationIndex !== -1) {
    const firstPart = message.slice(0, punctuationIndex + 1)
    const restPart = message.slice(punctuationIndex + 1).trim()

    return (
      <>
        {firstPart} <br />
        {restPart}
      </>
    )
  }

  return message
}
