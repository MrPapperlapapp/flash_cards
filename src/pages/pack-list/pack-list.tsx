import {useEffect, useMemo, useState} from 'react'

import s from './pack-list.module.scss'

import {Button, Modal, Pagination, Sort, Typography} from '@/components'
import {PackForm} from '@/components/auth/form-pack'
import {usePacksFilter} from '@/features/packs/model/hooks/use-filter-pack.ts'
import {usePacksPagination} from '@/features/packs/model/hooks/use-pagination-pack.ts'
import {useCreateDeckMutation, useGetDecksQuery} from '@/features/packs/model/services'
import {FilterControls} from '@/features/packs/ui/filter-controls/filter-controls.tsx'
import {PacksTable} from '@/features/packs/ui/pack-table/pack-table.tsx'
import {useDebounce} from '@/services/common/hooks/useDebounce.ts';
import {toast} from "react-toastify";

export const Packs = () => {
    const {currentPage, pageSize, setCurrentPage, setPageSize} = usePacksPagination()
    const {searchName, tabValue, sliderValue, setSearchName, setTabValue, setSliderValue} =
        usePacksFilter()

    const debouncedSearchName = useDebounce(searchName)
    const debouncedSliderValue = useDebounce(sliderValue)


    const [open, setOpen] = useState(false)

    const [sort, setSort] = useState<Sort>({key: 'updated', direction: 'desc'})

    const sortedString = useMemo(() => {
        if (!sort) return ''

        return `${sort.key}-${sort.direction}`
    }, [sort])

    const {data: packs, error} = useGetDecksQuery({
        authorId: tabValue,
        name: debouncedSearchName,
        orderBy: sortedString,
        currentPage,
        itemsPerPage: pageSize,
        minCardsCount: debouncedSliderValue[0],
        maxCardsCount: debouncedSliderValue[1],
    })

    useEffect(() => {
        setCurrentPage(1)

        if (error) {
            if ('status' in error) {
                toast.error(`${error.status}`, {toastId: 'fetchDecks'})
            } else {
                toast.error('failed to fetch', {toastId: 'fetchDecks'})
            }
        }
    }, [sliderValue, searchName, tabValue, pageSize, error])

    const [createDeck] = useCreateDeckMutation()

    const createDeckHandler = (data: FormData) => {
        createDeck(data)
            .unwrap()
            .catch(error => {
                if ('status' in error) {
                    toast.error(`${error.data.message}`, {toastId: 'createDeck'})
                }
            })
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
                    sliderMaxValue={packs?.maxCardsCount}
                    setSliderValue={setSliderValue}
                    tabValue={tabValue}
                    setTabValue={setTabValue}
                />
            </div>
            {packs?.items && <PacksTable items={packs.items} sort={sort} onSort={setSort}/>}
            <Pagination
                totalCount={packs?.pagination.totalItems || 0}
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
