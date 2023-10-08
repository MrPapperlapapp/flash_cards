import { Deck, DecksParams, DecksResponse } from './'

import { baseApi } from '@/services/base-api.ts'

const decksAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<DecksResponse, DecksParams>({
      query: params => ({
        url: `v1/decks`,
        method: 'GET',
        params: params ?? {},
      }),
      providesTags: ['Decks'],
    }),
    createDeck: builder.mutation<Deck, FormData>({
      query: data => ({
        url: `v1/decks`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Decks'],
    }),
    deleteDeck: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `v1/decks/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['Decks'],
    }),
    updateDeck: builder.mutation<Deck, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `v1/decks/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Decks'],
    }),
    getDeckInfo: builder.query<Omit<Deck, 'author'>, { id: string }>({
      query: ({ id }) => ({
        url: `v1/decks/${id}`,
        method: 'GET',
      }),
      providesTags: ['Decks'],
    }),
  }),
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
  useGetDeckInfoQuery,
} = decksAPI
