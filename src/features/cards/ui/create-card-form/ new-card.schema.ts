import { z } from 'zod'

export const newCardSchema = z.object({
    question: z.string().min(3).max(30),
    answer: z.string().min(3).max(30),
    questionImg: z.any(),
    answerImg: z.any(),
})

export type NewCard = z.infer<typeof newCardSchema>