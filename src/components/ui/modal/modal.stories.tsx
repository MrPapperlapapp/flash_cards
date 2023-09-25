import { Meta, StoryObj } from '@storybook/react'
import { Button, Modal } from '@/components'
import { CheckEmail } from '@/components/auth/check-email'
import { useState } from 'react'

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
    children: <CheckEmail email={'a@a.com'} />,
  },
}

export const ModalWithCloseButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    showCloseButton: true,
  },
}
