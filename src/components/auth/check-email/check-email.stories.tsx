import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from '@/components/auth/check-email/check-email.tsx'

const meta = {
  title: 'Auth/Check Email',
  component: CheckEmail,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ margin: '3em', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { email: 'test@email.com' },
  render: () => {
    return <CheckEmail email={'test@email.com'} />
  },
}
