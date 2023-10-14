import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Button, Modal, SignIn } from '@/components'
import { CheckEmail } from '@/components/auth/check-email'

const meta = {
  title: 'Components/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="primary" onClick={() => setOpen(true)}>
            Modal Open
          </Button>
        </div>
        <Modal {...args} isOpen={open} onClose={() => setOpen(false)} />
      </>
    )
  },
  args: {
    children: <SignIn />,
  },
}

export const ModalWithCloseButton: Story = {
  ...Default,
  args: {
    children: <CheckEmail />,
    showCloseButton: true,
  },
}
