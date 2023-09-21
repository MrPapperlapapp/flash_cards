import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from '@/components/ui/radio-group/radio-group'

const options = [
  {
    value: 'apple',
    label: 'Apple',
  },
  {
    value: 'banana',
    label: 'Banana',
  },
  {
    value: 'blueberry',
    label: 'Blueberry',
  },
  {
    value: 'grapes',
    label: 'Grapes',
  },
  {
    value: 'pineapple',
    label: 'Pineapple',
  },
  {
    value: 'apple1',
    label: 'Apple',
  },
  {
    value: 'banana1',
    label: 'Banana',
  },
]

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Main: Story = {
  render: args => {
    const [val, setVal] = useState('blueberry')

    return (
      <div>
        <RadioGroup {...args} value={val} onValueChange={setVal} />
        <span>Current: {val}</span>
      </div>
    )
  },
  args: {
    options,
    disabled: false,
  },
}

export const DefaultDisabled = {
  ...Main,
  args: {
    ...Main.args,
    disabled: true,
  },
}
