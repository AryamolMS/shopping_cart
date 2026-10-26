
import type { CartItem, ShippingDetails } from '../types/product'
import OrderSummary from '../components/OrderSummary'

interface PaymentSummaryPageProps {
  items: CartItem[]
  shipping: ShippingDetails
  onPlaceOrder: () => void
  onBack: () => void
}

export default function PaymentSummaryPage({
  items,
  shipping,
  onPlaceOrder,
  onBack,
}: PaymentSummaryPageProps) {
  return (
    <main className="container py-4">
      <h1 className="h2 mb-4">Review Your Order</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <section className="card mb-4">
            <div className="card-body">
              <h2 className="h5">Shipping Information</h2>
              <p className="mb-1">{shipping.fullName}</p>
              <p className="mb-1">{shipping.email}</p>
              <p className="mb-1">{shipping.phone}</p>
              <p className="mb-1">{shipping.address}</p>
              <p className="mb-0">
                {shipping.city}, {shipping.postalCode}
              </p>
            </div>
          </section>

          <section className="card">
            <div className="card-body">
              <h2 className="h5 mb-3">Cart Items</h2>

              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="d-flex justify-content-between gap-3 mb-3"
                >
                  <span>
                    {item.product.title} × {item.quantity}
                  </span>

                  <span className="text-nowrap">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-12 col-lg-5">
          <OrderSummary items={items} />

          <p className="text-secondary small mt-3">
            This is a demo checkout. No real payment will be processed.
          </p>

          <button
            className="btn btn-primary w-100 mt-2"
            onClick={onPlaceOrder}
          >
            Place Order
          </button>

          <button
            className="btn btn-outline-secondary w-100 mt-2"
            onClick={onBack}
          >
            Back to Shipping
          </button>
        </div>
      </div>
    </main>
  )
}
