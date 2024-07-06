import { Order, OrderModel } from './order.model'
import { ProductModel } from '../product.model'

const createOrderIntoDb = async (order: Order) => {
  // Check product inventory

  const product = await ProductModel.findById(order.productId)
  if (!product) {
    console.log('Product not found:', order.productId)
    throw new Error('Product not found')
  }

  // Check if enough quantity is available
  console.log('Product found:', product)
  if (product.inventory.quantity < order.quantity) {
    console.log(
      'Insufficient quantity available:',
      product.inventory.quantity,
      order.quantity,
    )
    throw new Error('Insufficient quantity available in inventory')
  }

  // Update the inventory
  product.inventory.quantity -= order.quantity
  product.inventory.inStock = product.inventory.quantity > 0
  await product.save()

  // Create the order
  const result = await OrderModel.create(order)

  return result
}

const findOrdersByEmail = async (email: string) => {
  const orders = await OrderModel.find({ email }).exec()
  return orders
}

const findAllOrders = async () => {
  const orders = await OrderModel.find().exec()
  return orders
}

export const orderServices = {
  findAllOrders,
  findOrdersByEmail,
  createOrderIntoDb,
}
