import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from '@/services/baseQueryReAuth.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Me'],
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
})
