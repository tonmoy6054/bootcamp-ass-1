import express from 'express'
import { productControllers } from './product.controller'
import { validateRequest } from '../../../../src/middlewares/validateRequest'
import { ProductSchema } from './product.validation'

const router = express.Router()
router.get('/products', productControllers.searchProducts)
router.get('/products', productControllers.getAllProducts)
router.get('/products/:productId', productControllers.getSingleProduct)
router.post(
  '/products',
  validateRequest(ProductSchema),
  productControllers.createProduct
)

router.delete('/products/:productId', productControllers.deleteProduct)
router.put(
  '/products/:productId',
  validateRequest(ProductSchema),
  productControllers.updateProduct
)
export const ProductRoutes = router
