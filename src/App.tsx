
import { useState } from 'react'
import Navbar from './components/Navbar'
import ShopPage from './pages/ShopPage'
import CartPage from './pages/CartPage'
import ShippingPage from './pages/ShippingPage'
import PaymentSummaryPage from './pages/PaymentSummary'
import { useCartStore } from './store/cartStore'
import type { ShippingDetails } from './types/product'

type Page = 'shop' | 'cart' | 'shipping' | 'summary'

const emptyShippingDetails: ShippingDetails = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
}

function App() {
  const [page, setPage] = useState<Page>('shop')
  const [shipping, setShipping] = useState<ShippingDetails | null>(null)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  function placeOrder() {
    clearCart()
    setShipping(null)
    setOrderSuccess(true)
    setPage('shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onShop={() => setPage('shop')}
        onCart={() => setPage('cart')}
      />

      {orderSuccess && page === 'shop' && (
        <div className="container mt-3">
          <div className="alert alert-success" role="status">
            Order placed successfully! Your demo order is complete.
          </div>
          <button
            className="btn btn-sm btn-outline-secondary mb-3"
            onClick={() => setOrderSuccess(false)}
          >
            Dismiss
          </button>
        </div>
      )}

      {page === 'shop' && (
        <ShopPage onOpenCart={() => setPage('cart')} />
      )}

      {page === 'cart' && (
        <CartPage
          onShop={() => setPage('shop')}
          onCheckout={() => setPage('shipping')}
        />
      )}

{page === 'shipping' && (
  <ShippingPage
    initialDetails={shipping ?? emptyShippingDetails}
    onBack={() => setPage('cart')}
    onContinue={(details) => {
      setShipping(details)
      setPage('summary')
    }}
  />
)}

      {page === 'summary' && shipping && items.length > 0 && (
        <PaymentSummaryPage
          items={items}
          shipping={shipping}
          onBack={() => setPage('shipping')}
          onPlaceOrder={placeOrder}
        />
      )}

      {page === 'summary' && (!shipping || items.length === 0) && (
        <main className="container py-5">
          <p>Your checkout session is no longer available.</p>
          <button
            className="btn btn-primary"
            onClick={() => setPage('shop')}
          >
            Return to Shop
          </button>
        </main>
      )}

      <footer className="border-top mt-5 py-4 text-center text-secondary small">
        ShopCart · Demo shopping application
      </footer>
    </>
  )
}

export default App
