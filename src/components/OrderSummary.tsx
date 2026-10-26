
import type { CartItem } from '../types/product'
import { calculateCart } from '../utils/cartCalculations'

interface OrderSummaryProps {
  items: CartItem[]
}

export default function OrderSummary({ items }: OrderSummaryProps) {
  const { subtotal, tax, discount, total } = calculateCart(items)

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 mb-3">Order Summary</h2>

        <div className="d-flex justify-content-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-between mb-2 text-success">
          <span>Discount</span>
          <span>-${discount.toFixed(2)}</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between fw-bold fs-5">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
