import { FC, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Pagination, PaginationPropsType } from '@/components/ui/pagination/pagination.tsx'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ margin: '3em', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      exclude: /(?:\b|')(currentPage|pageSize|onPageChange)(?:\b|')/g,
    },
  },
  argTypes: {
    // currentPage: {
    //   table: {
    //     disable: true,
    //   },
    //   control: false,
    // },
  },
} satisfies Meta<typeof Pagination>

const ControlledPagination: FC<PaginationPropsType> = ({
  onPageSizeChange,
  pageSize,
  currentPage,
  onPageChange,
  ...args
}) => {
  const [page, setPage] = useState(1)
  const [pSize, setPSize] = useState('20')

  return (
    <Pagination
      pageSize={+pSize}
      onPageSizeChange={setPSize}
      currentPage={page}
      onPageChange={setPage}
      {...args}
    />
  )
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    currentPage: 1,
    pageSize: 20,
    siblingCount: 1,
    totalCount: 30,
  },
  render: args => <ControlledPagination {...args} />,
}
