import {useGetCardsQuery} from "@/features/cards/model";
import {cardsSelectors} from "@/features/cards/model/card-selectors.ts";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {CardsTable} from "@/features/cards/ui/cards-table.tsx";
import {Button, Modal, Pagination, TextField, Typography} from "@/components";
import ArrowBackOutline from "@/assets/icons/arrowBackOutline.tsx";
import {cardsSlice} from "@/features/cards/model/card-slice.ts";
import {useAppDispatch} from "@/app/store/store.ts";
import {useGetMeQuery} from "@/features/auth/model/services/auth.ts";
import {useGetDeckInfoQuery} from "@/features/packs/model/services";
import {DropDown, DropDownItemWithIcon} from "@/components/ui/drop-down";
import {Play} from "@/assets/icons/drop-down/play.tsx";
import {Edit} from "@/assets/icons/drop-down/edit.tsx";
import {Delete} from "@/assets/icons/drop-down/delete.tsx";
import {useEffect, useState} from "react";
import {CreateNewCard} from "@/features/cards/ui/create-card-form/create-card-form.tsx";
import {DeleteItem} from "@/features/cards/ui/delete-card-form/delete-card-form.tsx";
import {EditCard} from "@/features/cards/ui/edit-card-form/edit-card-form.tsx";
import s from "./cards.module.scss"


export const Cards = () => {

    const [addNewCardOpen, setAddNewCardOpen] = useState(false)
    const [deleteCardOpen, setDeleteCardOpen] = useState(false)
    const [deletePackOpen, setDeletePackOpen] = useState(false)
    const [deleteOrEditCardId, setDeleteOrEditCardId] = useState('')
    const [editCardOpen, setEditCardOpen] = useState(false)
    const currentPage = useSelector(cardsSelectors.selectCurrentPage)
    const itemsPerPage = useSelector(cardsSelectors.selectItemsPerPage)
    const orderBy = useSelector(cardsSelectors.selectOrderBy)
    const searchValue = useSelector(cardsSelectors.selectSearchByQuestion)
    const dispatch = useAppDispatch()
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


    const {cards, totalItems, isLoading, isFetching} = useGetCardsQuery(
        {id: packId, question: searchValue, currentPage, itemsPerPage, orderBy},
        {
            selectFromResult: ({data, isLoading, isFetching}) => {
                return {
                    cards: data?.items,
                    totalItems: data?.pagination.totalItems,
                    isLoading,
                    isFetching,
                }
            },
        }
    )
    const {authorId, packName, isLoadingDeckInfo, isFetchingDeckInfo} = useGetDeckInfoQuery(
        {id: packId ?? "0"},
        {
            selectFromResult: ({data, isLoading: isLoadingDeckInfo, isFetching: isFetchingDeckInfo}) => {
                return {
                    authorId: data?.userId,
                    packName: data?.name,
                    isLoadingDeckInfo,
                    isFetchingDeckInfo,
                }
            },
        }
    )

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
                <CreateNewCard onSubmit={() => setAddNewCardOpen(false)} id={packId ?? ''}
                               onCancel={() => setAddNewCardOpen(false)}/>
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
                <DeleteItem isPack={true} id={packId??''} onCancel={() => setDeletePackOpen(false)}/>
            </Modal>

            {/*//edit card*/}
            <Modal
                isOpen={editCardOpen}
                showCloseButton={editCardOpen}
                onClose={() => setEditCardOpen(false)}
                className={s.modal}
                title={'Edit card'}
            >
                <EditCard onSubmit={() => setEditCardOpen(false)} id={deleteOrEditCardId}
                          onCancel={() => setEditCardOpen(false)}/>
            </Modal>
            <div className={s.backLinkWrapper}>
                <Button className={s.backLink} variant={'link'} as={Link} to={'/'}>
                    <>
                        <ArrowBackOutline/>
                        Back to Packs List
                    </>
                </Button>
            </div>
            <div className={s.header}>
                <div className={s.titleWrapper}>
                    <Typography className={s.title} variant="large">{packName}</Typography>
                    {isMyPack && <div className={s.titleDropDown}><DropDown>
                        <DropDownItemWithIcon icon={<Play/>} text="Learn"/>
                        <DropDownItemWithIcon icon={<Edit/>} text="Edit"/>
                        <DropDownItemWithIcon icon={<Delete/>} text="Delete" onSelect={() => setDeletePackOpen(true)}/>
                    </DropDown></div>}
                </div>
                {isMyPack ? <Button onClick={() => setAddNewCardOpen(true)}>Add New Card</Button>
                    : <Button>Learn to Pack</Button>}
            </div>
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