
import type { CartItem } from '../types/product'

export function calculateCart(items: CartItem[]) {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const tax = subtotal * 0.05
  const discount = subtotal > 100 ? subtotal * 0.10 : 0
  const total = subtotal + tax - discount

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    total: Number(total.toFixed(2)),
  }
}
