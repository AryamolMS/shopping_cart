
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/products'
import { useCartStore } from '../store/cartStore'
import { useProductFilters } from '../hooks/useProductFilters'
import ProductCard from '../components/ProductCard'

interface ShopPageProps {
  onOpenCart: () => void
}

export default function ShopPage({ onOpenCart }: ShopPageProps) {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  const addToCart = useCartStore((state) => state.addToCart)

  const filters = useProductFilters(products ?? [])

  if (isLoading) {
    return <p className="text-center py-5">Loading products...</p>
  }

  if (isError) {
    return (
      <div className="container py-5">
        <p className="text-danger">{error.message}</p>
      </div>
    )
  }

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2">Discover Products</h1>
          <p className="text-secondary mb-0">
            Find something you love.
          </p>
        </div>

        <button className="btn btn-dark" onClick={onOpenCart}>
          View Cart
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <input
            className="form-control"
            placeholder="Search by title..."
            value={filters.search}
            onChange={(event) => filters.setSearch(event.target.value)}
          />
        </div>

        <div className="col-12 col-md-4">
          <select
            className="form-select"
            value={filters.category}
            onChange={(event) => filters.setCategory(event.target.value)}
          >
            <option value="">All categories</option>
            {filters.categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-4">
          <input
            type="number"
            min="0"
            className="form-control"
            placeholder="Maximum price ($)"
            value={filters.maxPrice}
            onChange={(event) => filters.setMaxPrice(event.target.value)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-secondary mb-0">
          {filters.filteredProducts.length} products found
        </p>

        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={filters.clearFilters}
        >
          Clear Filters
        </button>
      </div>

      {filters.filteredProducts.length === 0 ? (
        <p className="text-center py-5">
          No products match your filters.
        </p>
      ) : (
        <div className="row g-4">
          {filters.filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
            />
          ))}
        </div>
      )}
    </main>
  )
}
