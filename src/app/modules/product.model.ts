import { Schema, model } from 'mongoose'

export type Variant = {
  type: string
  value: string
}

export type Inventory = {
  quantity: number
  inStock: boolean
}

export type Product = {
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  variants: Variant[]
  inventory: Inventory
}

const VariantSchema = new Schema<Variant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
})

const InventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
})

const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [VariantSchema], required: true },
    inventory: { type: InventorySchema, required: true },
  },
  { timestamps: true },
)

export const ProductModel = model<Product>('Product', ProductSchema)
