import { z } from 'zod'

// Product Validators
const VariantSchema = z.object({
  type: z.string(),
  value: z.string(),
})

const InventorySchema = z.object({
  quantity: z.number().min(0),
  inStock: z.boolean(),
})

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(0),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(VariantSchema),
  inventory: InventorySchema,
})
