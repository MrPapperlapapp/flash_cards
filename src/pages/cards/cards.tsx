import {useGetCardsQuery} from "@/features/cards/model";
import {cardsSelectors} from "@/features/cards/model/card-selectors.ts";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {CardsTable} from "@/features/cards/ui/cards-table.tsx";
import {Button, Pagination, TextField, Typography} from "@/components";
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


export const Cards = () => {


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

    const resetCardsData = () => {
      dispatch(cardsSlice.actions.resetCardsData())
    }

    const { cardId } = useParams()


    const { cards, totalItems, isLoading, isFetching } = useGetCardsQuery(
        { id: cardId, question: searchValue, currentPage, itemsPerPage, orderBy },
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
        { id: cardId ?? "0"},
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
            <Button variant={'link'} as={Link} to={'/'} onClick={resetCardsData}>
                <>
                    <ArrowBackOutline />
                    Back to Packs List
                </>
            </Button>
            <div>
                <Typography variant="large">{packName}</Typography>
                {isMyPack && <DropDown>
                    <DropDownItemWithIcon icon={<Play />} text="Learn"/>
                    <DropDownItemWithIcon icon={<Edit />} text="Edit" />
                    <DropDownItemWithIcon icon={<Delete />} text="Delete" />
                </DropDown> }
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