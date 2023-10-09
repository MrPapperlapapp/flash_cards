import { FC, memo } from 'react'

import s from './pack-table.module.scss'

import { Table, TableHeaderProps } from '@/components/ui/table'
import { Deck } from '@/features/packs/model/services'
import { PackRow } from '@/features/packs/ui/pack-row/pack-row.tsx'
const columns = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'created',
    title: 'Created By',
  },
  {
    key: 'controls',
    title: '',
    sortable: false,
  },
]

type Props = {
  items?: Deck[]
} & Pick<TableHeaderProps, 'sort' | 'onSort'>

export const PacksTable: FC<Props> = memo(({ items, ...rest }) => {
  const authUserId = '' //добавить, когда будет авторизация

  if (!items?.length) {
    return <div className={s.empty}>No content with these terms...</div>
  }

  return (
    <Table.Root className={s.container}>
      <Table.Header columns={columns} {...rest} />
      <Table.Body>
        {items.map(pack => (
          <PackRow key={pack.id} pack={pack} authUserId={authUserId} />
        ))}
      </Table.Body>
    </Table.Root>
  )
})
