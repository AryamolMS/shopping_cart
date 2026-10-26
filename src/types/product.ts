
import { z } from 'zod'
import { ProductSchema } from '../schemas/productSchema'

export type Product = z.infer<typeof ProductSchema>

export interface CartItem {
  product: Product
  quantity: number
}

export interface ShippingDetails {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
}
