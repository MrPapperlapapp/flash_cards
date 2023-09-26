import { Profile } from '@/components/profile/profile.tsx'
import { Meta, StoryObj } from '@storybook/react'

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
    avatarImg:
      'https://t4.ftcdn.net/jpg/02/85/46/81/240_F_285468179_nY3iZePEB0ymN6s7LjI1lK9o90VwS6m5.jpg',
    title: 'Profile',
    email: 'a@a.com',
    name: 'Gustov',
  },
  render: args => <Profile {...args} />,
}
