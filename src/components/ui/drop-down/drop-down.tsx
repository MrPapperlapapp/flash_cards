import { FC, ReactNode, useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

import s from './drop-down.module.scss'

import { More } from '@/assets/icons/drop-down/more.tsx'
import { Typography } from '@/components/ui'

type DropDownProps = {
  trigger?: ReactNode
  children: ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
} & DropdownMenu.DropdownMenuProps

export const DropDown: FC<DropDownProps> = ({ trigger, children, align = 'end', className }) => {
  const [open, setOpen] = useState(false)
  const classNames = {
    trigger: s.trigger,
    btn: s.btn,
    content: clsx(s.content, className),
  }

  return (
    <DropdownMenu.Root modal open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger className={classNames.trigger} asChild>
        {trigger ?? (
          <button className={classNames.btn}>
            <More />
          </button>
        )}
      </DropdownMenu.Trigger>
      <AnimatePresence>
        {open && (
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content
              align={align}
              forceMount
              className={classNames.content}
              asChild
              onClick={e => e.stopPropagation()}
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {children}
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  )
}

type DropDownItemProps = {
  children: ReactNode
  onSelect?: (e: Event) => void
  className?: string
}

export const DropDownItem: FC<DropDownItemProps> = ({ children, className, onSelect }) => {
  const itemClass = clsx(s.profileBlock, className)

  return (
    <DropdownMenu.Item className={itemClass} onSelect={onSelect} onClick={e => e.stopPropagation()}>
      <motion.div onClick={e => e.stopPropagation()} className={s.profileWrapper}>
        {children}
      </motion.div>
    </DropdownMenu.Item>
  )
}

type DropDownItemWithIconProps = Omit<DropDownItemProps, 'children'> & {
  icon: ReactNode
  text: string
}

export const DropDownItemWithIcon: FC<DropDownItemWithIconProps> = props => {
  const { icon, text, className, onSelect } = props

  const itemClass = clsx(s.item, className)

  return (
    <DropdownMenu.Item className={itemClass} onSelect={onSelect}>
      <div className={s.icon}>{icon}</div>
      <Typography>{text}</Typography>
    </DropdownMenu.Item>
  )
}
