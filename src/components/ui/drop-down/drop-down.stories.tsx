import { Meta, StoryObj } from '@storybook/react'

import { AvatarIcon } from '@/assets/icons/drop-down/avatar-icon.tsx'
import { Delete } from '@/assets/icons/drop-down/delete.tsx'
import { Edit } from '@/assets/icons/drop-down/edit.tsx'
import { Play } from '@/assets/icons/drop-down/play.tsx'
import { Logout } from '@/assets/icons/logout.tsx'
import { Avatar } from '@/components/ui/avatar'
import {
  DropDown,
  DropDownItem,
  DropDownItemWithIcon,
} from '@/components/ui/drop-down/drop-down.tsx'

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
    return (
      <div style={{ marginLeft: 150 }}>
        <DropDown
          trigger={
            <button>
              <Avatar userName={'Alex Smirnov'} />
            </button>
          }
        >
          <DropDownItem>Profile Info With Avatar</DropDownItem>
          <DropDownItemWithIcon icon={<AvatarIcon />} text="My profile" />
          <DropDownItemWithIcon icon={<Logout />} text="Sign out" />
        </DropDown>
      </div>
    )
  },
}
