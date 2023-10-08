import { useEffect, useMemo, useState } from 'react'

import s from './pack-list.module.scss'

import { Button, Modal, Pagination, Sort, Typography } from '@/components'
import { PackForm } from '@/components/auth/form-pack'
import { usePacksFilter } from '@/feature/packs/model/hooks/use-filter-pack.ts'
import { usePacksPagination } from '@/feature/packs/model/hooks/use-pagination-pack.ts'
import { useCreateDeckMutation, useGetDecksQuery } from '@/feature/packs/model/services'
import { FilterControls } from '@/feature/packs/ui/filter-controls/filter-controls.tsx'
import { PacksTable } from '@/feature/packs/ui/pack-table/pack-table.tsx'
export const Packs = () => {
  const { currentPage, pageSize, setCurrentPage, setPageSize } = usePacksPagination()
  const { searchName, tabValue, sliderValue, setSearchName, setTabValue, setSliderValue } =
    usePacksFilter()

  const [open, setOpen] = useState(false)

  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })

  const sortedString = useMemo(() => {
    if (!sort) return ''

    return `${sort.key}-${sort.direction}`
  }, [sort])

  const packs = useGetDecksQuery({
    authorId: tabValue,
    name: searchName,
    orderBy: sortedString,
    currentPage,
    itemsPerPage: pageSize,
    minCardsCount: sliderValue[0],
    maxCardsCount: sliderValue[1],
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [sliderValue, searchName, tabValue, pageSize])

  const [createDeck] = useCreateDeckMutation()

  const createDeckHandler = (data: FormData) => {
    createDeck(data)
    setOpen(false)
  }

  return (
    <section className={s.root}>
      <Modal
        isOpen={open}
        showCloseButton={open}
        onClose={() => setOpen(false)}
        className={s.modal}
        title={'Add new pack'}
      >
        <PackForm
          onSubmit={createDeckHandler}
          onCancel={() => setOpen(false)}
          className={s.packForm}
        />
      </Modal>
      <div className={s.header}>
        <div className={s.top}>
          <Typography as="h1" variant="large">
            Packs list
          </Typography>
          <Button onClick={() => setOpen(true)}>Add New Pack</Button>
        </div>
        <FilterControls
          searchName={searchName}
          setSearchName={setSearchName}
          sliderValue={sliderValue}
          sliderMaxValue={packs?.data?.maxCardsCount}
          setSliderValue={setSliderValue}
          tabValue={tabValue}
          setTabValue={setTabValue}
        />
      </div>
      {packs?.data?.items && <PacksTable items={packs.data.items} sort={sort} onSort={setSort} />}
      <Pagination
        totalCount={packs?.data?.pagination.totalItems || 0}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={e => {
          setPageSize(+e)
        }}
        className={s.pagination}
      />
    </section>
  )
}
