import mongoose from 'mongoose'
import { Product, ProductModel } from '../product.model'

const createProductIntoDb = async (product: Product) => {
  const result = await ProductModel.create(product)
  return result
}

const getAllProductsFromDb = async () => {
  const result = await ProductModel.find()
  return result
}

const getSingleProductFromDb = async (id: string) => {
  try {
    const result = await ProductModel.findById(id)
    if (!result) {
      throw new Error('Product not found')
    }
    return result
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

const deleteProductFromDb = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { error: 'Invalid product ID' }
    }

    const result = await ProductModel.deleteOne({ _id: id })
    return result.deletedCount ? null : { error: 'Product not found' }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { error: 'Internal server error' }
  }
}

const updateProductInDb = async (id: string, updatedData: Partial<Product>) => {
  const result = await ProductModel.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  })
  return result
}

const searchProductsInDb = async (searchTerm: string) => {
  const result = await ProductModel.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
      { tags: { $regex: searchTerm, $options: 'i' } },
    ],
  })
  return result
}

export const productServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getSingleProductFromDb,
  deleteProductFromDb,
  updateProductInDb,
  searchProductsInDb,
}
