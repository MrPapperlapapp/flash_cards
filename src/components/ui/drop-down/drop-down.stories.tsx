import { Meta, StoryObj } from '@storybook/react'

import { Delete } from '@/assets/icons/drop-down/delete.tsx'
import { Edit } from '@/assets/icons/drop-down/edit.tsx'
import { Play } from '@/assets/icons/drop-down/play.tsx'
import { User } from '@/assets/icons/drop-down/user.tsx'
import { Logout } from '@/assets/icons/logout.tsx'
import { Avatar } from '@/components/ui/avatar'
import {
  DropDown,
  DropDownItem,
  DropDownItemWithIcon,
} from '@/components/ui/drop-down/drop-down.tsx'
import { ProfileInfo } from '@/components/ui/header/profile-info'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDown,
  tags: ['autodocs'],
} satisfies Meta<typeof DropDown>

export default meta

type Story = StoryObj<typeof meta>

// @ts-ignore
export const DropDownWithSettings: Story = {
  render: () => {
    return (
      <div style={{ marginLeft: 150 }}>
        <DropDown>
          <DropDownItemWithIcon icon={<Play />} text="Learn" />
          <DropDownItemWithIcon icon={<Edit />} text="Edit" />
          <DropDownItemWithIcon icon={<Delete />} text="Delete" />
        </DropDown>
      </div>
    )
  },
}

// @ts-ignore
export const DropDownWithProfile: Story = {
  render: () => {
    const data = {
      name: 'Alex Smirnov',
      email: 'alex-email.gmail.com',
      avatar:
        'https://t4.ftcdn.net/jpg/02/85/46/81/240_F_285468179_nY3iZePEB0ymN6s7LjI1lK9o90VwS6m5.jpg',
    }

    return (
      <div style={{ marginLeft: 150 }}>
        <DropDown
          trigger={
            <button>
              <Avatar image={data.avatar} userName={'Alex Smirnov'} />
            </button>
          }
        >
          <DropDownItem>
            {<ProfileInfo avatar={data.avatar} email={data.email} name={data.name} />}
          </DropDownItem>
          <DropDownItemWithIcon icon={<User />} text="My profile" />
          <DropDownItemWithIcon icon={<Logout />} text="Sign out" />
        </DropDown>
      </div>
    )
  },
}
