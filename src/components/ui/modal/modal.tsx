import { ReactNode, useEffect } from 'react'

import { clsx } from 'clsx'
import { createPortal } from 'react-dom'

import s from './modal.module.scss'

import { Close } from '@/assets/icons/text-field/close.tsx'
import { Typography } from '@/components'

export const Modal = ({
  children,
  isOpen = false,
  onClose,
  className,
  showCloseButton = false,
  title,
}: ModalProps) => {
  if (!isOpen) return null

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', close)

    return () => window.removeEventListener('keydown', close)
  }, [])

  const classNames = {
    modal: clsx(s.modal, className),
    modalWrapper: s.modalWrapper,
    button: s.closeButton,
    top: s.top,
  }

  return (
    <>
      {createPortal(
        <>
          <div className={classNames.modalWrapper} onClick={onClose}></div>
          <div className={classNames.modal}>
            <div className={classNames.top}>
              {title && <Typography variant={'h2'}>{title}</Typography>}
              {showCloseButton && (
                <button className={classNames.button} onClick={onClose}>
                  <Close />
                </button>
              )}
            </div>
            {children}
          </div>
        </>,
        document.body
      )}
    </>
  )
}

type ModalProps = {
  isOpen?: boolean
  children?: ReactNode
  onClose?: () => void
  showCloseButton?: boolean
  className?: string
  title?: string
}
