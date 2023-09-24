import { ReactNode } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tabs.module.scss'

import { Typography } from '@/components/ui'

export const Tabs = ({ tabs, value, defaultValue, label, fullWidth, onValueChange }: TabsProps) => {
  return (
    <RadixTabs.Root
      className={s.tabsRoot}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      {label && (
        <Typography variant={'body2'} mb={2}>
          {label}
        </Typography>
      )}
      <RadixTabs.List className={s.tabsList}>
        {tabs.map(el => (
          <RadixTabs.Trigger
            className={clsx(s.tabsTrigger, fullWidth && s.fullWidth)}
            key={el.value}
            value={el.value}
            disabled={el.disabled}
          >
            <Typography variant={'body1'}>{el.label}</Typography>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  )
}

export type TabsType = {
  value: string
  label: string
  disabled: boolean
}

type TabsProps = {
  tabs: TabsType[]
  value?: string
  children?: ReactNode
  defaultValue?: string
  label?: string
  fullWidth?: boolean
  onValueChange?: (value: string) => void
}
