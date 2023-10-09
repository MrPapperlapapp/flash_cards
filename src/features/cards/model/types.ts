import { RatingValue } from '@/components'

export type Pagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type Card = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: any
  answerImg?: any
  questionVideo?: any
  answerVideo?: any
  created: string
  updated: string
  shots: number
  grade: RatingValue
}

export type GetCardsResponse = {
  pagination: Pagination
  items: Card[]
}

export type CreateCardResponse = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  questionImg?: any
  answerImg?: any
  answerVideo?: any
  questionVideo?: any
  comments?: any
  type?: any
  rating: number
  moreId?: any
  created: string
  updated: string
}

export type GetLearnResponse = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: any
  answerImg?: any
  questionVideo?: any
  answerVideo?: any
  created: string
  updated: string
  shots: number
  grade: number
}

export type ArgGetLearn = {
  id: string | undefined
}

export type SaveGradeResponse = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: any
  answerImg?: any
  questionVideo?: any
  answerVideo?: any
  created: string
  updated: string
  shots: number
  grade: number
}

export type ArgSaveGrade = {
  id: string | undefined
  cardId: string | undefined
  grade: string | number
}
