import {
  Card,
  CardRateRequest,
  CreateCardResponse,
  GetCardsResponse,
  RandomCardRequest,
} from '@/features/cards/model/types.ts'
import { baseApi } from '@/services/base-api.ts'

export const cardsApi = baseApi.injectEndpoints({
    endpoints: builder => {
        return {
            getCards: builder.query<GetCardsResponse, any>({
                query: ({id, question, currentPage, itemsPerPage, orderBy}) => {
                    return {
                        url: `v1/decks/${id}/cards`,
                        params: {question, currentPage, itemsPerPage, orderBy},
                    }
                },
                providesTags: ['Card'],
            }),
            getCardById: builder.query<Card, any>({
                query: ({id}) => {
                    return {
                        url: `v1/cards/${id}`,
                    }
                },
            }),
            createCard: builder.mutation<CreateCardResponse, any>({
                query: ({id, form}) => {
                    return {
                        method: 'POST',
                        url: `v1/decks/${id}/cards`,
                        body: form,
                    }
                },
                invalidatesTags: ['Card'],
            }),
            updateCard: builder.mutation<any, any>({
                query: ({id, form}) => {
                    return {
                        method: 'PATCH',
                        url: `v1/cards/${id}`,
                        body: form,
                    }
                },
                invalidatesTags: ['Card'],
            }),
            deleteCard: builder.mutation<any, {id:string}>({
                query: ({id}) => {
                    return {
                        method: 'DELETE',
                        url: `v1/cards/${id}`,
                    }
                },
                invalidatesTags: ['Card'],
            }),
    getRandomCard: builder.query<Card, RandomCardRequest>({
        query: ({ id, previousCardId }) => ({
            url: `v1/decks/${id}/learn`,
            method: 'GET',
            params: { previousCardId },
        }),
    }),
    rateCard: builder.mutation<Card, CardRateRequest>({
        query: ({ packId, ...rest }) => ({
            url: `v1/decks/${packId}/learn`,
            method: 'POST',
            body: rest,
        }),
        async onQueryStarted({ packId }, { dispatch, queryFulfilled }) {
            try {
                const { data: newCard } = await queryFulfilled

                dispatch(
                    cardsApi.util.updateQueryData('getRandomCard', { id: packId }, () => {
                        return newCard
                    })
                )
            } catch (e) {
                console.log(e)
            }
        },
        invalidatesTags: ['Card'],
    }),
}
},
})

export const {
    useGetCardsQuery,
    useLazyGetCardsQuery,
    useCreateCardMutation,
    useDeleteCardMutation,
    useUpdateCardMutation,
    useGetCardByIdQuery,
    useGetRandomCardQuery,
    useRateCardMutation,
} = cardsApi

export type ArgCreateCard = {
    id: string | undefined
    question: string
    answer: string
    questionImg?: string
    answerImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type ArgGetCards = {
    id: string | undefined
    currentPage?: number
    itemsPerPage?: number
}
