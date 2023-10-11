import {useGetCardsQuery} from "@/features/cards/model";
import {cardsSelectors} from "@/features/cards/model/card-selectors.ts";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {CardsTable} from "@/features/cards/ui/cards-table.tsx";
import {Button, Modal, Pagination, TextField, Typography} from "@/components";
import ArrowBackOutline from "@/assets/icons/arrowBackOutline.tsx";
import s from "@/pages/pack-list/pack-list.module.scss";
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
import {DeleteCard} from "@/features/cards/ui/delete-card-form/delete-card-form.tsx";


export const Cards = () => {

    const [addNewCardOpen, setAddNewCardOpen] = useState(false)
    const [deleteCardOpen, setDeleteCardOpen] = useState(false)
    const [deleteCardId, setDeleteCardId] = useState('')
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

    useEffect(()=> {
        setSearchValue('')
    },[])

    const { packId } = useParams()


    const { cards, totalItems, isLoading, isFetching } = useGetCardsQuery(
        { id: packId, question: searchValue, currentPage, itemsPerPage, orderBy },
        {
            selectFromResult: ({ data, isLoading, isFetching }) => {
                return {
                    cards: data?.items,
                    totalItems: data?.pagination.totalItems,
                    isLoading,
                    isFetching,
                }
            },
        }
    )
    const { authorId, packName, isLoadingDeckInfo, isFetchingDeckInfo } = useGetDeckInfoQuery(
        { id: packId ?? "0"},
        {
            selectFromResult: ({ data, isLoading:isLoadingDeckInfo, isFetching:isFetchingDeckInfo }) => {
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



    return(
        <div>
            {/*//create card*/}
            <Modal
                isOpen={addNewCardOpen}
                showCloseButton={addNewCardOpen}
                onClose={() => setAddNewCardOpen(false)}
                className={s.modal}
                title={'Add new card'}
            >
                <CreateNewCard onSubmit={() => setAddNewCardOpen(false)} id={packId??''} onCancel={() => setAddNewCardOpen(false)}/>
            </Modal>
            {/*//delete card*/}
            <Modal
                isOpen={deleteCardOpen}
                showCloseButton={deleteCardOpen}
                onClose={() => setDeleteCardOpen(false)}
                className={s.modal}
                title={'Delete card'}
            >
                <DeleteCard id={deleteCardId} onCancel={() => setDeleteCardOpen(false)}/>
            </Modal>
            <Button variant={'link'} as={Link} to={'/'}>
                <>
                    <ArrowBackOutline />
                    Back to Packs List
                </>
            </Button>
            <div>
                <div>
                    <Typography variant="large">{packName}</Typography>
                    {isMyPack && <DropDown>
                        <DropDownItemWithIcon icon={<Play/>} text="Learn"/>
                        <DropDownItemWithIcon icon={<Edit/>} text="Edit"/>
                        <DropDownItemWithIcon icon={<Delete/>} text="Delete"/>
                    </DropDown>}
                </div>
                {isMyPack ? <Button onClick={()=>setAddNewCardOpen(true)}>Add New Card</Button>
                : <Button>Learn to Pack</Button>}
            </div>
            <TextField
                value={searchValue}
                onChange={e => {
                    setSearchValue(e.currentTarget.value)}}
                type={'search'}
                placeholder="Input search"
            />
            <CardsTable
                items={cards}
                isMyPack={isMyPack}
                onClickDelete={setDeleteCardOpen}
                setDeleteCardId={setDeleteCardId}
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
        </div>

    )
}