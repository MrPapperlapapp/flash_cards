import { Profile } from '@/components/profile/profile.tsx'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

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
    isEdit: false,
  },
  render: args => {
    const [isEdit, setIsEdit] = useState(false)
    return <Profile {...args} isEdit={isEdit} onSubmit={() => setIsEdit(p => !p)} />
  },
}
