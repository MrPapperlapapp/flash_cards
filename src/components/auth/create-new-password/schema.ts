import { z } from 'zod'

export const createNewPasswordSchema = z.object({
  newPassword: z
    .string()
    .trim()
    .nonempty('Enter password')
    .min(8, 'Password must be at least 8 characters'),
})
