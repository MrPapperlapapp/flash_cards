import { ReactNode } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

import { Typography } from '@/components/ui'

export const Tabs = ({ tabs, value, defaultValue, children, onValueChange }: TabsProps) => {
  return (
    <RadixTabs.Root
      className={s.tabsRoot}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <RadixTabs.List className={s.tabsList} aria-label="Manage your account">
        {tabs.map(el => (
          <RadixTabs.Trigger
            className={s.tabsTrigger}
            key={el.value}
            value={el.value}
            disabled={el.disabled}
          >
            <Typography variant={'body1'}>{el.label}</Typography>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  )
}

export const TabsContent = ({ children, value }: TabsContentProps) => {
  return (
    <RadixTabs.Content className={s.tabsContent} value={value}>
      {children}
    </RadixTabs.Content>
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
  children: ReactNode
  defaultValue?: string
  onValueChange?: () => void
}

type TabsContentProps = {
  value: string
  children: ReactNode
}
