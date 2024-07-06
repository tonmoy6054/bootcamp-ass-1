import { Request, Response } from 'express'
import { productServices } from './product.service'
import { Product } from '../product.model'

const createProduct = async (req: Request, res: Response) => {
  try {
    console.log('Incoming request body:', req.body)
    const product: Product = req.body

    // Validate input data
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.category ||
      !product.inventory
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required product fields',
      })
    }

    const result = await productServices.createProductIntoDb(product)
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductsFromDb()
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const result = await productServices.getSingleProductFromDb(productId)
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    console.log('Deleting product with ID:', productId)

    const result = await productServices.deleteProductFromDb(productId)
    console.log('Deletion result:', result)

    if (result && result.error) {
      res.status(404).json({
        success: false,
        message: result.error,
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      })
    }
  } catch (error) {
    console.error('Error in deleteProduct controller:', error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const updatedData = req.body

    const result = await productServices.updateProductInDb(
      productId,
      updatedData,
    )
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    })
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

const searchProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string
    const result = await productServices.searchProductsInDb(searchTerm)
    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  searchProducts,
}
