
interface NavbarProps {
  cartCount: number
  onShop: () => void
  onCart: () => void
}

export default function Navbar({
  cartCount,
  onShop,
  onCart,
}: NavbarProps) {
  return (
    <nav className="navbar bg-white border-bottom sticky-top">
      <div className="container py-2">
        <button
          className="btn btn-link text-decoration-none fw-bold fs-4 text-dark"
          onClick={onShop}
        >
          ShopCart
        </button>

        <button className="btn btn-outline-dark" onClick={onCart}>
          Cart ({cartCount})
        </button>
      </div>
    </nav>
  )
}
