import { Schema, model, Document } from 'mongoose'

export interface Order extends Document {
  email: string
  productId: Schema.Types.ObjectId
  price: number
  quantity: number
}

const OrderSchema = new Schema<Order>(
  {
    email: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
)

export const OrderModel = model<Order>('Order', OrderSchema)
