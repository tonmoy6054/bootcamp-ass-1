// import { Request, Response } from 'express'

// import { Order } from './order.model'
// import { orderServices } from './order.service'

// const createOrder = async (req: Request, res: Response) => {
//   try {
//     console.log('Request body:', req.body)
//     const order: Order = req.body

//     const result = await orderServices.createOrderIntoDb(order)
//     res.status(200).json({
//       success: true,
//       message: 'Order created successfully!',
//       data: result,
//     })
//   } catch (error:error) {
//     console.error('Error creating order:', error)
//     if (error.message === 'Insufficient quantity available in inventory') {
//       res.status(400).json({
//         success: false,
//         message: error.message,
//       })
//     } else if (error.message === 'Product not found') {
//       res.status(404).json({
//         success: false,
//         message: error.message,
//       })
//     } else {
//       res.status(500).json({
//         success: false,
//         message: 'Something went wrong',
//         error: error.message,
//       })
//     }
//   }
// }

// const getOrders = async (req: Request, res: Response) => {
//   try {
//     const email = req.query.email as string | undefined

//     let orders
//     if (email) {
//       orders = await orderServices.findOrdersByEmail(email)
//     } else {
//       orders = await orderServices.findAllOrders()
//     }

//     res.status(200).json({
//       success: true,
//       message: email
//         ? 'Orders fetched successfully for user email!'
//         : 'All orders fetched successfully!',
//       data: orders,
//     })
//   } catch (error) {
//     console.error('Error fetching orders:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Something went wrong',
//       error: error.message,
//     })
//   }
// }

// export const orderControllers = {
//   createOrder,

//   getOrders,
// }

import { Request, Response } from 'express'
import { Order } from './order.model'
import { orderServices } from './order.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    console.log('Request body:', req.body)
    const order: Order = req.body

    const result = await orderServices.createOrderIntoDb(order)
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (error) {
    console.error('Error creating order:', error)

    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      if (error.message === 'Insufficient quantity available in inventory') {
        res.status(400).json({
          success: false,
          message: error.message,
        })
      } else if (error.message === 'Product not found') {
        res.status(404).json({
          success: false,
          message: error.message,
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Something went wrong',
          error: error.message,
        })
      }
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      })
    }
  }
}

const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined

    let orders
    if (email) {
      orders = await orderServices.findOrdersByEmail(email)
    } else {
      orders = await orderServices.findAllOrders()
    }

    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'All orders fetched successfully!',
      data: orders,
    })
  } catch (error) {
    console.error('Error fetching orders:', error)

    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.message,
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      })
    }
  }
}

export const orderControllers = {
  createOrder,
  getOrders,
}
