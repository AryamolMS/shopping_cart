
import { useCartStore } from '../store/cartStore'
import { calculateCart } from '../utils/cartCalculations'
import OrderSummary from '../components/OrderSummary'

interface CartPageProps {
  onCheckout: () => void
  onShop: () => void
}

export default function CartPage({
  onCheckout,
  onShop,
}: CartPageProps) {
  const items = useCartStore((state) => state.items)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)

  const { subtotal } = calculateCart(items)
  const canCheckout = subtotal >= 10 && items.length > 0

  if (items.length === 0) {
    return (
      <main className="container py-5 text-center">
        <h1 className="h3">Your cart is empty</h1>
        <p className="text-secondary">Add some products to get started.</p>
        <button className="btn btn-primary" onClick={onShop}>
          Browse Products
        </button>
      </main>
    )
  }

  return (
    <main className="container py-4">
      <h1 className="h2 mb-4">Your Shopping Cart</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          {items.map((item) => (
            <div className="card mb-3" key={item.product.id}>
              <div className="card-body">
                <div className="row align-items-center g-3">
                  <div className="col-3 col-md-2">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="img-fluid"
                      style={{ objectFit: 'contain', maxHeight: 100 }}
                    />
                  </div>

                  <div className="col-9 col-md-4">
                    <h2 className="h6">{item.product.title}</h2>
                    <p className="mb-0">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>

                  <div className="col-7 col-md-4">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        disabled={item.quantity <= 1}
                        onClick={() => decreaseQuantity(item.product.id)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        disabled={item.quantity >= 5}
                        onClick={() => increaseQuantity(item.product.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-5 col-md-2 text-end">
                    <p className="fw-bold mb-2">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      className="btn btn-sm btn-link text-danger"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            className="btn btn-outline-danger"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>

        <div className="col-12 col-lg-4">
          <OrderSummary items={items} />

          {!canCheckout && (
            <p className="text-danger small mt-3">
              Your subtotal must be at least $10 to proceed to checkout.
            </p>
          )}

          <button
            className="btn btn-primary w-100 mt-3"
            disabled={!canCheckout}
            onClick={onCheckout}
          >
            Proceed to Shipping
          </button>
        </div>
      </div>
    </main>
  )
}
