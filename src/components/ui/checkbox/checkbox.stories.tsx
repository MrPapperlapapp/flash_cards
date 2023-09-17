import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'
import {Checkbox} from "@/components/ui/checkbox/checkbox.tsx";

const meta = {
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        checked: { checked: { control: { type: 'boolean' } }, label: { control: { type: 'text' } } },
    },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Main: Story = {
    render: args => {
        const [checked, setChecked] = useState(true)

        return <Checkbox {...args} checked={checked} onValueChange={setChecked} />
    },
    args: {
        checked: true,
        label: 'checkbox component',
    },
}
export const Checked: Story = {
    args: {
        checked: true,
    },
}
export const Disabled: Story = {
    args: {
        checked: false,
        disabled: true,
    },
}
export const CheckedDisabled: Story = {
    args: {
        checked: true,
        disabled: true,
    },
}
export const CheckedWithLabel: Story = {
    args: {
        checked: true,
        label: 'Check-box',
    },
}
export const DisabledWithLabel: Story = {
    args: {
        checked: true,
        disabled: true,
        label: 'Check-box',
    },
}
