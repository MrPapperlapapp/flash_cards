import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Profile } from '@/components/profile/profile.tsx'

const meta = {
  title: 'profile/Profile',
  component: Profile,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ margin: '3em', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof Profile>

export default meta

type Story = StoryObj<typeof meta>

export const ProfilePage: Story = {
  args: {
    onSubmit: () => {},
  },
  render: args => {
    return (
      <BrowserRouter>
        <Profile {...args} />
      </BrowserRouter>
    )
  },
}
