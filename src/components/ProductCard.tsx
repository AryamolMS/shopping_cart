
import type { Product } from '../types/product'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
}

export default function ProductCard({
  product,
  onAdd,
}: ProductCardProps) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="card h-100 shadow-sm">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="card-img-top p-3"
          style={{ height: 220, objectFit: 'contain' }}
        />

        <div className="card-body d-flex flex-column">
          <h3 className="h6">{product.title}</h3>
          <p className="text-secondary small text-capitalize">
            {product.category}
          </p>
          <p className="small">Rating: {product.rating} / 5</p>
          <p className="fw-bold">${product.price.toFixed(2)}</p>

          <button
            className="btn btn-primary mt-auto"
            onClick={() => onAdd(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
