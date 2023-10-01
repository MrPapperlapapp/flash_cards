import { PaginatedRequest, PaginatorEntity } from '@/services/types.ts'

export type GetDecksArgs = PaginatedRequest<{
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string
}>

export type DecksResponse = PaginatorEntity<Decks> & { maxCardsCount: number }

export type CreateDeckArgs = {
  name: string
}
export interface Author {
  id: string
  name: string
}
export interface Decks {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: string
  rating: number
  isDeleted?: boolean
  isBlocked?: boolean
  created: string
  updated: string
  cardsCount: number
  author: Author
}
