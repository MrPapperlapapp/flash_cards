import type { Meta, StoryObj } from '@storybook/react'
import {CreateNewPassword} from "@/components";





const meta = {
  title: 'Auth/Create New Password',
  component: CreateNewPassword,
  tags: ['autodocs'],
  decorators: [
    Story => (
        <div style={{ margin: '3em', display: 'flex', justifyContent: 'center' }}>
          <Story />
        </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: data => {
      console.log(data)
    },
  },
}