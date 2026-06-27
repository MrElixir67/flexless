"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { getProducts, type ApiProduct } from "@/lib/api"
import { Plus, Pencil, SprayCan, Droplets, Package as PackageIcon, Brush } from "lucide-react"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ApiProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Products</h1>
          <p className="text-sm text-text-muted">{products.length} products total</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Product</Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border-dark">
          <table className="w-full text-sm">
            <thead className="bg-primary-light">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-text-muted">Product</th>
                <th className="px-4 py-3 text-left font-medium text-text-muted">Category</th>
                <th className="px-4 py-3 text-left font-medium text-text-muted">Price</th>
                <th className="px-4 py-3 text-left font-medium text-text-muted">Stock</th>
                <th className="px-4 py-3 text-left font-medium text-text-muted">Rating</th>
                <th className="px-4 py-3 text-right font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-primary-light/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                        {product.category === "cleaner" ? (
                          <SprayCan className="h-5 w-5 text-secondary" />
                        ) : product.category === "treatment" ? (
                          <Droplets className="h-5 w-5 text-secondary" />
                        ) : product.category === "kit" ? (
                          <PackageIcon className="h-5 w-5 text-secondary" />
                        ) : (
                          <Brush className="h-5 w-5 text-secondary" />
                        )}
                      </div>
                      <span className="font-medium text-text-primary">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-muted capitalize">{product.category}</td>
                  <td className="px-4 py-3 text-text-primary font-medium">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">
                    <span className={product.stock > 0 ? "text-green-400" : "text-red-400"}>{product.stock}</span>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{product.rating}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-2 text-text-muted hover:text-secondary">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
