import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Tabs, Typography } from '@/components/ui'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

const tabs = [
  {
    value: '1',
    label: '1111',
    disabled: false,
  },
  {
    value: '2',
    label: '2222',
    disabled: false,
  },
  {
    value: '3',
    label: '3333',
    disabled: false,
  },
]

export const Main: Story = {
  render: args => {
    const [currTab, setCurrTab] = useState('3')
    let content = ''

    switch (currTab) {
      case '1': {
        content = '1 + 1 + 1'
        break
      }
      case '2': {
        content = '2 + 2 + 2'
        break
      }
      default: {
        content = '3 + 3 + 3'
        break
      }
    }

    return (
      <>
        <Tabs {...args} defaultValue={currTab} onValueChange={(val: string) => setCurrTab(val)} />
        <Typography variant={'body1'} my={2} mx={2}>
          Content: {content}
        </Typography>
      </>
    )
  },
  args: {
    tabs,
  },
}

export const OneDisabled: Story = {
  ...Main,
  args: {
    tabs: tabs.map(el => (el.value === '3' ? { ...el, disabled: true } : el)),
    defaultValue: '2',
  },
}

export const FullWidth: Story = {
  ...Main,
  args: {
    ...Main.args,
    fullWidth: true,
  },
}
