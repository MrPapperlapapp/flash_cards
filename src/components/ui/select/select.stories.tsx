import { useState } from 'react'

import { Meta } from '@storybook/react'

import { Select } from './select.tsx'

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
    value: 'cherry',
    label: 'Cherry',
  },
  {
    value: 'grapefruit',
    label: 'Grapefruit',
  },
  {
    value: 'lemon',
    label: 'Lemon',
  },
  {
    value: 'mango',
    label: 'Mango',
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

export default {
  title: 'Components/Select',
  tags: ['autodocs'],
  component: Select,
} as Meta<typeof Select>

export const Primary = {
  render: (args: any) => {
    const [value, setValue] = useState(null)

    return (
      <div style={{ width: 500 }}>
        <Select {...args} value={value} onChange={setValue} />
        <div>Selected value: {value}</div>
      </div>
    )
  },

  args: {
    placeholder: 'All',
    disabled: false,
    options,
  },
}

export const PrimaryWithLabel = {
  render: (args: any) => {
    const [value, setValue] = useState(null)

    return (
      <div style={{ width: 500 }}>
        <Select {...args} value={value} onChange={setValue} label={'Select-box'} />
        <div>Selected value: {value}</div>
      </div>
    )
  },

  args: {
    placeholder: 'All',
    disabled: false,
    options,
    label: 'Select-Box',
  },
}

export const Multiple = {
  render: (args: any) => {
    const [values, setValues] = useState([])

    return (
      <>
        <Select {...args} value={values} onChange={setValues} multiple />
        <div>Selected values: {values.join(', ')}</div>
      </>
    )
  },

  args: {
    placeholder: 'All',
    disabled: false,
    multiple: true,
    options,
  },
}

export const Disabled = {
  render: (args: any) => {
    const [value, setValue] = useState(null)

    return (
      <>
        <Select {...args} value={value} onChange={setValue} disabled />
        <div>Selected value: {value}</div>
      </>
    )
  },

  args: {
    placeholder: 'All',
    disabled: true,
    errorMessage: 'Ошибка',
    options,
  },
}
