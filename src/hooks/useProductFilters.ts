
import { useMemo, useState } from 'react'
import type { Product } from '../types/product'

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  )

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.trim().toLowerCase())

      const matchesCategory =
        category === '' || product.category === category

      const matchesPrice =
        maxPrice === '' || product.price <= Number(maxPrice)

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [products, search, category, maxPrice])

  function clearFilters() {
    setSearch('')
    setCategory('')
    setMaxPrice('')
  }

  return {
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    categories,
    filteredProducts,
    clearFilters,
  }
}
