import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    packName: '',
    searchByQuestion: '',
    currentPage: 1,
    itemsPerPage: 10,
    orderBy: 'created-desc',
  },
  reducers: {
    setSearchByQuestion: (state, action: PayloadAction<{ question: string }>) => {
      state.searchByQuestion = action.payload.question
    },
    setCurrentPage: (state, action: PayloadAction<{ page: number }>) => {
      state.currentPage = action.payload.page
    },
    setItemsPerPage: (state, action: PayloadAction<{ perPage: number }>) => {
      state.itemsPerPage = action.payload.perPage
    },
    setOrderBy: (state, action: PayloadAction<{ orderBy: string }>) => {
      state.orderBy = action.payload.orderBy
    },
    setPackName: (state, action: PayloadAction<{ packName: string }>) => {
      state.packName = action.payload.packName
    },
    resetCardsData: (state) => {
      const initial = cardsSlice.getInitialState()
      state.orderBy = initial.orderBy
      state.packName = initial.packName
      state.currentPage = initial.currentPage
      state.itemsPerPage = initial.itemsPerPage
      state.searchByQuestion = initial.searchByQuestion
    },
  },
})

export const { setSearchByQuestion, setCurrentPage, setItemsPerPage, setOrderBy } =
  cardsSlice.actions
export const cardsReducer = cardsSlice.reducer
