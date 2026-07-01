"use client"

import { useState, useMemo, useEffect } from "react"
import { useTranslations } from "next-intl"
import { ProductCard } from "@/components/product/ProductCard"
import { categories, products as localProducts } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import { getProducts, type ApiProduct } from "@/lib/api"

export function ProductsGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default")
  const [showFilters, setShowFilters] = useState(false)
  const fallbackProducts: ApiProduct[] = localProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    name_en: null,
    description: p.description,
    description_en: null,
    price: p.price,
    stock: p.stock,
    images: null,
    category: p.category,
    shopee_url: null,
    shopee_item_id: null,
    rating: p.rating,
    sold_count: p.soldCount,
    is_active: true,
    created_at: new Date().toISOString(),
  }))

  const [products, setProducts] = useState<ApiProduct[]>(fallbackProducts)
  const [loading, setLoading] = useState(false)

  const t = useTranslations("products")
  const tc = useTranslations("common")

  useEffect(() => {
    getProducts().then((data) => {
      if (data && data.length > 0) {
        setProducts(data)
      }
    }).catch(() => {
      // keep fallback products
    })
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)),
      )
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    return result
  }, [searchQuery, selectedCategory, sortBy, products])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{t("title")}</h1>
        <p className="mt-1 text-sm text-text-muted sm:text-base">{t("desc")}</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder={tc("searchProducts")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border-dark bg-primary-light py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-lg border border-border-dark bg-primary-light px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="default">{tc("default")}</option>
            <option value="price-asc">{tc("priceLowHigh")}</option>
            <option value="price-desc">{tc("priceHighLow")}</option>
            <option value="rating">{tc("highestRated")}</option>
          </select>
          <Button variant="outline" size="sm" className="sm:hidden" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-6 flex gap-8">
        <aside className={`w-56 shrink-0 ${showFilters ? "block" : "hidden"} sm:block`}>
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-text-primary">{tc("categories")}</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    !selectedCategory ? "bg-secondary/10 text-secondary" : "text-text-muted hover:bg-primary-light hover:text-text-primary"
                  }`}
                >
                  {tc("allProducts")}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      selectedCategory === cat.slug ? "bg-secondary/10 text-secondary" : "text-text-muted hover:bg-primary-light hover:text-text-primary"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-lg font-medium text-text-primary">{tc("noProductsFound")}</p>
              <p className="text-sm text-text-muted">{tc("tryAdjusting")}</p>
            </div>
          ) : (
            <div className="custom-scrollbar max-h-[60vh] overflow-y-auto pr-2 sm:max-h-[calc(100vh-20rem)] lg:max-h-[calc(100vh-18rem)]">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
