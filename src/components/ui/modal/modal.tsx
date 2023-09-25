import { createPortal } from 'react-dom'
import { ReactNode, useEffect } from 'react'

import s from './modal.module.scss'
import { Close } from '@/assets/icons/text-field/close.tsx'
import { clsx } from 'clsx'

export const Modal = ({
  children,
  isOpen = false,
  onClose,
  className,
  showCloseButton = false,
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
  }

  return (
    <>
      {createPortal(
        <>
          <div className={classNames.modalWrapper} onClick={onClose}></div>
          <div className={classNames.modal}>
            {children}
            {showCloseButton && (
              <button className={classNames.button} onClick={onClose}>
                <Close />
              </button>
            )}
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
}
