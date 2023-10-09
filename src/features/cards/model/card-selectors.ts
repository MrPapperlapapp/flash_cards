import { RootState } from '@/app/store/store.ts'

export const cardsSelectors = {
  selectCurrentPage: (state: RootState) => state.cards.currentPage,
  selectItemsPerPage: (state: RootState) => state.cards.itemsPerPage,
  selectSearchByQuestion: (state: RootState) => state.cards.searchByQuestion,
  selectOrderBy: (state: RootState) => state.cards.orderBy,
}
