import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '@/components/ui/card/card.tsx'

const meta = {
    title: 'Components/Card',
    component: Card,
    decorators: [
        Story => (
            <div style={{ margin: '3em', display: 'flex', justifyContent: 'center' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
    args: {
        children: (
            <div
                style={{
                    width: '250px',
                    height: '300px',
                    padding: '25px',
                }}
            >
                <h1>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </h1>
            </div>
        ),
    },
}