import { useMemo, useState } from 'react'

import { Meta } from '@storybook/react'

import DeleteIcon from '@/assets/icons/deleteIcon.tsx'
import EditIcon from '@/assets/icons/editIcon.tsx'
import { Sort } from '@/components'
import { Table } from '@/components/ui/table/table.tsx'
import { columns, data } from '@/components/ui/table/test-data.ts'

export default {
  title: 'Components/Table',
  tags: ['autodocs'],
  component: Table.Root,
} as Meta<typeof Table.Root>

export const WithSort = {
  render: (args: any) => {
    const [sort, setSort] = useState<Sort>(null)
    const [__, setDeleteModalOpen] = useState<boolean>(false)
    const [_, setEditCardModalOpen] = useState<boolean>(false)
    const sortString: string | null = sort ? `${sort?.key}-${sort?.direction}` : null

    const sortedData = useMemo(() => {
      if (!sortString) {
        return data
      }
      const [key, direction] = sortString.split('-')

      return [...data].sort((a, b) => {
        if (direction === 'asc') {
          return a[key as keyof typeof a] > b[key as keyof typeof b] ? 1 : -1
        }

        return a[key as keyof typeof a] < b[key as keyof typeof b] ? 1 : -1
      })
    }, [sortString])

    return (
      <Table.Root {...args} style={{ width: '100%' }}>
        <Table.Header columns={columns} onSort={setSort} sort={sort} />
        <Table.Body>
          {sortedData.map(item => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.cardsCount}</Table.Cell>
              <Table.Cell>{item.updated}</Table.Cell>
              <Table.Cell>{item.createdBy}</Table.Cell>
              <Table.Cell>
                <button onClick={() => setEditCardModalOpen(true)}>
                  <EditIcon />
                </button>
                <button onClick={() => setDeleteModalOpen(true)}>
                  <DeleteIcon />
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    )
  },
}
