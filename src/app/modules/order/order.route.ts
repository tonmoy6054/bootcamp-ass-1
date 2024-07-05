import express from 'express'

import { orderControllers } from './order.controller'

import { OrderSchema, emailSchema } from './order.validation'
import { validateRequest } from '../../../../src/middlewares/validateRequest'

const router = express.Router()

router.get('/orders', validateRequest(emailSchema), orderControllers.getOrders)
router.post(
  '/orders',
  validateRequest(OrderSchema),
  orderControllers.createOrder
)

export const OrderRoutes = router
