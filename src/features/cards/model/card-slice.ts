import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    searchByQuestion: '',
    currentPage: 1,
    itemsPerPage: 4,
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
  },
})

export const { setSearchByQuestion, setCurrentPage, setItemsPerPage, setOrderBy } =
  cardsSlice.actions
export const cardsReducer = cardsSlice.reducer
