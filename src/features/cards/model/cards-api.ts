import {Card, CreateCardResponse, GetCardsResponse} from '@/features/cards/model/types.ts'
import {baseApi} from '@/services/base-api.ts'

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
                query: id => {
                    return {
                        method: 'DELETE',
                        url: `v1/cards/${id}`,
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
    useGetCardByIdQuery
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
