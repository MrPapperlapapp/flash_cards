import * as RadixTabs from '@radix-ui/react-tabs'
import s from './tabs.module.scss'
import { Typography } from '@/components/ui'
export const Tabs = () => {
  return (
    <RadixTabs.Root className={s.TabsRoot} defaultValue="tab1">
      <RadixTabs.List className={s.TabsList} aria-label="Manage your account">
        <RadixTabs.Trigger className={s.TabsTrigger} value="tab1">
          <Typography variant={'body1'}>Account</Typography>
        </RadixTabs.Trigger>
        <RadixTabs.Trigger className={s.TabsTrigger} value="tab2">
          Password
        </RadixTabs.Trigger>
        <RadixTabs.Trigger className={s.TabsTrigger} value="tab3">
          Email
        </RadixTabs.Trigger>
      </RadixTabs.List>
      <RadixTabs.Content className={s.TabsContent} value="tab1">
        <p className="Text">Make changes to your account here. Click save when you're done.</p>
      </RadixTabs.Content>
      <RadixTabs.Content className={s.TabsContent} value="tab2">
        <p className="Text">Change your password here. After saving, you'll be logged out.</p>
      </RadixTabs.Content>
      <RadixTabs.Content className={s.TabsContent} value="tab3">
        <p className="Text">Change your password here. After saving, you'll be logged out.</p>
      </RadixTabs.Content>
    </RadixTabs.Root>
  )
}
