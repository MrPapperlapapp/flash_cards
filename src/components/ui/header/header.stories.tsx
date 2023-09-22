import { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { Header } from '@/components/ui/header/index.ts'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

// @ts-ignore
export const AuthorizedUser: Story = {
  render: () => {
    const data = {
      name: 'Alex Smirnov',
      email: 'alex-email.gmail.com',
      avatar:
        'https://t4.ftcdn.net/jpg/02/85/46/81/240_F_285468179_nY3iZePEB0ymN6s7LjI1lK9o90VwS6m5.jpg',
    }
    const logout = () => {}

    return (
      <BrowserRouter>
        <Header data={data} logout={logout} />
      </BrowserRouter>
    )
  },
}
// @ts-ignore
export const UnAuthorizedUser: Story = {
  render: () => {
    const data = null
    const logout = () => {}

    return (
      <BrowserRouter>
        <Header data={data} logout={logout} />
      </BrowserRouter>
    )
  },
}
