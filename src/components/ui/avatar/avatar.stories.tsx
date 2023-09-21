import { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '@/components/ui/avatar/avatar.tsx'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const AvatarWithImage: Story = {
  args: {
    userName: 'Ivan Smirnov',
    image:
      'https://t4.ftcdn.net/jpg/02/85/46/81/240_F_285468179_nY3iZePEB0ymN6s7LjI1lK9o90VwS6m5.jpg',
  },
}

export const AvatarFallback: Story = {
  args: {
    userName: 'Alex Ivanov',
  },
}

export const AvatarWithPropsStyles: Story = {
  args: {
    userName: 'Ivan Smirnov',
    image:
      'https://t4.ftcdn.net/jpg/02/85/46/81/240_F_285468179_nY3iZePEB0ymN6s7LjI1lK9o90VwS6m5.jpg',
    style: { border: '3px solid blue' },
    size: 70,
  },
}
