import { z } from 'zod'

export const OrderSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().min(0),
  quantity: z.number().min(1),
})

export const emailSchema = z.object({
  query: z.object({
    email: z.string().email().optional(),
  }),
})
