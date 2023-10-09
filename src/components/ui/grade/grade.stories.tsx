import { useState } from 'react'

import type { Meta } from '@storybook/react'
import { StoryObj } from '@storybook/react'

import { Grade, RatingValue } from './index'

const meta = {
  title: 'Components/Grade',
  component: Grade,
  tags: ['autodocs'],
} satisfies Meta<typeof Grade>

export default meta
type Story = StoryObj<typeof meta>

export const EmptyGrade: Story = {
  args: {
    value: 0,
    onClick: () => {},
  },
}

export const Grade1: Story = {
  args: {
    value: 1,
    onClick: () => {},
  },
}

export const Grade2: Story = {
  args: {
    value: 2,
    onClick: () => {},
  },
}

export const Grade3: Story = {
  args: {
    value: 3,
    onClick: () => {},
  },
}

export const Grade4: Story = {
  args: {
    value: 4,
    onClick: () => {},
  },
}

export const Grade5: Story = {
  args: {
    value: 5,
    onClick: () => {},
  },
}

export const ChangeGrade = () => {
  const [rating, setRating] = useState<RatingValue>(0)

  return <Grade value={rating} onClick={setRating} />
}
