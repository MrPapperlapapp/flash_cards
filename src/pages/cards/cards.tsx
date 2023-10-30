import {useEffect, useState} from 'react'

import {useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'

import s from './cards.module.scss'

import {useAppDispatch} from '@/app/store/store.ts'
import {Delete} from '@/assets/icons/drop-down/delete.tsx'
import {Edit} from '@/assets/icons/drop-down/edit.tsx'
import {Play} from '@/assets/icons/drop-down/play.tsx'
import {Button, Modal, Pagination, TextField, Typography} from '@/components'
import {BackButton} from '@/components/ui/back-button/back-button.tsx'
import {DropDown, DropDownItemWithIcon} from '@/components/ui/drop-down'
import {useGetMeQuery} from '@/features/auth/model/services/auth.ts'
import {useGetCardsQuery} from '@/features/cards/model'
import {cardsSelectors} from '@/features/cards/model/card-selectors.ts'
import {cardsSlice} from '@/features/cards/model/card-slice.ts'
import {CardsTable} from '@/features/cards/ui/cards-table.tsx'
import {CreateNewCard} from '@/features/cards/ui/create-card-form/create-card-form.tsx'
import {DeleteItem} from '@/features/cards/ui/delete-card-form/delete-card-form.tsx'
import {EditCard} from '@/features/cards/ui/edit-card-form/edit-card-form.tsx'
import {useGetDeckInfoQuery} from '@/features/packs/model/services'
import {EditPackModal} from '@/features/packs/ui/pack-edit-modal/pack-edit-modal.tsx'
import {useDebounce} from '@/services/common/hooks/useDebounce.ts'
import {toast} from "react-toastify";

export const Cards = () => {
    const [addNewCardOpen, setAddNewCardOpen] = useState(false)
    const [deleteCardOpen, setDeleteCardOpen] = useState(false)
    const [deletePackOpen, setDeletePackOpen] = useState(false)
    const [deleteOrEditCardId, setDeleteOrEditCardId] = useState('')
    const [editCardOpen, setEditCardOpen] = useState(false)
    const [editPackOpen, setEditPackOpen] = useState(false)

    const currentPage = useSelector(cardsSelectors.selectCurrentPage)
    const itemsPerPage = useSelector(cardsSelectors.selectItemsPerPage)
    const orderBy = useSelector(cardsSelectors.selectOrderBy)
    const searchValue = useSelector(cardsSelectors.selectSearchByQuestion)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const debouncedSearchValue = useDebounce(searchValue)
    const setCurrentPage = (currentPage: number) =>
        dispatch(cardsSlice.actions.setCurrentPage({page: currentPage}))

    const setItemsPerPage = (itemsPerPage: number) =>
        dispatch(cardsSlice.actions.setItemsPerPage({perPage: itemsPerPage}))

    const setSearchValue = (searchValue: string) =>
        dispatch(cardsSlice.actions.setSearchByQuestion({question: searchValue}))

    const setOrderBy = (newOrderBy: any) => {
        console.log(newOrderBy)
        dispatch(cardsSlice.actions.setOrderBy({orderBy: newOrderBy}))
    }

    useEffect(() => {
        setSearchValue('')
    }, [])

    const {packId} = useParams()

    const {cards, totalItems, error} = useGetCardsQuery(
        {id: packId, question: debouncedSearchValue, currentPage, itemsPerPage, orderBy},
        {
            selectFromResult: ({data, isLoading, isFetching, error}) => {
                return {
                    cards: data?.items,
                    totalItems: data?.pagination.totalItems,
                    isLoading,
                    isFetching,
                    error,
                }
            },
        }
    )
    const {authorId, packName, packIsPrivate, packCover, errorDeckInfo} = useGetDeckInfoQuery(
        {id: packId ?? '0'},
        {
            selectFromResult: ({
                                   data,
                                   isLoading: isLoadingDeckInfo,
                                   isFetching: isFetchingDeckInfo,
                                   error,
                               }) => {
                return {
                    authorId: data?.userId,
                    packName: data?.name,
                    packIsPrivate: data?.isPrivate,
                    packCover: data?.cover,
                    isLoadingDeckInfo,
                    isFetchingDeckInfo,
                    errorDeckInfo: error,
                }
            },
        }
    )

    useEffect(() => {
        if(error && 'status' in error){
            toast.error(`${error.status}`, {toastId: 'cardsError'})
        }else if(errorDeckInfo && 'status' in errorDeckInfo){
            toast.error(`${errorDeckInfo.status}`, {toastId: 'cardsError'})
        }else if(errorDeckInfo || error){
            toast.error(`fetch failed`, {toastId: 'cardsError'})
        }
    }, [errorDeckInfo, error])

    const onLearn = () => {
        navigate(`/packs/${packId}/learn`)
    }

    const {data} = useGetMeQuery()
    const isMyPack = data?.id === authorId

    return (
        <section className={s.root}>
            {/*//create card*/}
            <Modal
                isOpen={addNewCardOpen}
                showCloseButton={addNewCardOpen}
                onClose={() => setAddNewCardOpen(false)}
                className={s.modal}
                title={'Add new card'}
            >
                <CreateNewCard
                    onSubmit={() => setAddNewCardOpen(false)}
                    id={packId ?? ''}
                    onCancel={() => setAddNewCardOpen(false)}
                />
            </Modal>

            {/*//delete card*/}
            <Modal
                isOpen={deleteCardOpen}
                showCloseButton={deleteCardOpen}
                onClose={() => setDeleteCardOpen(false)}
                className={s.modal}
                title={'Delete card'}
            >
                <DeleteItem id={deleteOrEditCardId} onCancel={() => setDeleteCardOpen(false)}/>
            </Modal>

            {/*//delete Pack*/}
            <Modal
                isOpen={deletePackOpen}
                showCloseButton={deletePackOpen}
                onClose={() => setDeletePackOpen(false)}
                className={s.modal}
                title={'Delete card'}
            >
                <DeleteItem isPack={true} id={packId ?? ''} onCancel={() => setDeletePackOpen(false)}/>
            </Modal>

            {/*//edit card*/}
            <Modal
                isOpen={editCardOpen}
                showCloseButton={editCardOpen}
                onClose={() => setEditCardOpen(false)}
                className={s.modal}
                title={'Edit card'}
            >
                <EditCard
                    onSubmit={() => setEditCardOpen(false)}
                    id={deleteOrEditCardId}
                    onCancel={() => setEditCardOpen(false)}
                />
            </Modal>

            {/*//edit pack*/}
            <EditPackModal
                open={editPackOpen}
                setOpen={setEditPackOpen}
                id={packId ?? ''}
                name={packName ?? ''}
                isPrivate={packIsPrivate ?? false}
                cover={packCover ?? ''}
            />

            <BackButton title={'Back to Packs List'} link={'/'}/>
            <div className={s.header}>
                <div className={s.titleWrapper}>
                    <Typography className={s.title} variant="large">
                        {packName}
                    </Typography>
                    {isMyPack && (
                        <div className={s.titleDropDown}>
                            <DropDown>
                                <DropDownItemWithIcon onSelect={onLearn} icon={<Play/>} text="Learn"/>
                                <DropDownItemWithIcon
                                    icon={<Edit/>}
                                    text="Edit"
                                    onSelect={() => setEditPackOpen(true)}
                                />
                                <DropDownItemWithIcon
                                    icon={<Delete/>}
                                    text="Delete"
                                    onSelect={() => setDeletePackOpen(true)}
                                />
                            </DropDown>
                        </div>
                    )}
                </div>
                {isMyPack ? (
                    <Button onClick={() => setAddNewCardOpen(true)}>Add New Card</Button>
                ) : (
                    <Button onClick={onLearn}>Learn to Pack</Button>
                )}
            </div>
            {packCover && <div className={s.packCover}>
                <img className={s.packCoverImg} src={packCover} alt="pack cover"/>
            </div>}
            <TextField
                className={s.search}
                value={searchValue}
                onChange={e => {
                    setSearchValue(e.currentTarget.value)
                }}
                type={'search'}
                placeholder="Input search"
            />
            <CardsTable
                onSort={setOrderBy}
                items={cards}
                isMyPack={isMyPack}
                onClickDelete={setDeleteCardOpen}
                onClickEdit={setEditCardOpen}
                setDeleteOrEditCardId={setDeleteOrEditCardId}
            />
            <Pagination
                className={s.pagination}
                totalCount={totalItems ?? 0}
                currentPage={currentPage ?? 1}
                onPageChange={setCurrentPage}
                pageSize={itemsPerPage ?? 10}
                onPageSizeChange={e => {
                    setItemsPerPage(+e)
                }}
            />

        </section>
    )
}
