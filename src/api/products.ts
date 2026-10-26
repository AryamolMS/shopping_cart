
import { ProductsResponseSchema } from '../schemas/productSchema'
import type { Product } from '../types/product'

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    'https://dummyjson.com/products?limit=30'
  )

  if (!response.ok) {
    throw new Error('Unable to load products. Please try again.')
  }

  const data: unknown = await response.json()
  const validatedData = ProductsResponseSchema.parse(data)

  return validatedData.products
}
