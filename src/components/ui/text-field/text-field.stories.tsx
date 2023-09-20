import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '@/components/ui'

const meta = {
  title: 'Components/Text Field',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['text', 'search', 'password'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Text = {
  render: () => {
    const [state, setState] = useState('')

    return (
      <TextField
        type={'text'}
        value={state}
        label={'Text field'}
        placeholder={'Placeholder'}
        onValueChange={(e: string) => {
          setState(e)
        }}
      />
    )
  },
}

export const Password = {
  render: () => {
    const [state, setState] = useState('')

    return (
      <TextField
        type={'password'}
        placeholder="Placeholder"
        label="Password text field"
        value={state}
        onValueChange={e => setState(e)}
      />
    )
  },
}

export const Search = {
  render: () => {
    const [state, setState] = useState('')

    return (
      <TextField
        type={'search'}
        value={state}
        label={'Search text field'}
        placeholder={'Placeholder'}
        onValueChange={(e: string) => {
          setState(e)
        }}
        clearField={() => setState('')}
      />
    )
  },
}

export const TextFieldWithoutLabel: Story = {
  args: {
    placeholder: 'Input',
  },
}
export const TextFieldWithError: Story = {
  args: {
    placeholder: 'Input',
    label: 'Input',
    errorMessage: 'Error',
  },
}
export const TextFieldDisabled: Story = {
  args: {
    placeholder: 'Input',
    label: 'Input',
    disabled: true,
  },
}
