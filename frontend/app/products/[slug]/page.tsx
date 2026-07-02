"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/StarRating"
import { formatPrice } from "@/lib/utils"
import { getProductBySlug as getApiProductBySlug, getProductReviews as getApiProductReviews, type ApiProduct, type ApiReview } from "@/lib/api"
import { getProductBySlug as getLocalProductBySlug, getProductReviews as getLocalProductReviews } from "@/data/products"
import { ShoppingBag, ChevronLeft, Minus, Plus, Shield, Truck, Leaf, Star, SprayCan } from "lucide-react"

async function getProductWithFallback(slug: string): Promise<ApiProduct | null> {
  try {
    const apiProduct = await getApiProductBySlug(slug)
    if (apiProduct) return apiProduct
  } catch {
    // fallback to local data
  }
  const local = getLocalProductBySlug(slug)
  if (!local) return null
  return {
    id: local.id,
    slug: local.slug,
    name: local.name,
    name_en: null,
    description: local.description,
    description_en: null,
    price: local.price,
    stock: local.stock,
    images: null,
    category: local.category,
    shopee_url: null,
    shopee_item_id: null,
    rating: local.rating,
    sold_count: local.soldCount,
    is_active: true,
    created_at: new Date().toISOString(),
  }
}

async function getReviewsWithFallback(productId: string): Promise<ApiReview[]> {
  try {
    const apiReviews = await getApiProductReviews(productId)
    if (apiReviews && apiReviews.length > 0) return apiReviews
  } catch {
    // fallback to local data
  }
  return getLocalProductReviews(productId).map((r) => ({
    id: r.id,
    product_id: r.productId,
    author_name: r.authorName,
    rating: r.rating,
    comment: r.comment,
    source: "local",
    shopee_review_id: null,
    created_at: r.date,
  }))
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [product, setProduct] = useState<ApiProduct | null>(null)
  const [reviews, setReviews] = useState<ApiReview[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const t = useTranslations("product")
  const tc = useTranslations("common")

  useEffect(() => {
    getProductWithFallback(slug).then((data) => {
      setProduct(data)
      if (data) {
        getReviewsWithFallback(data.id).then(setReviews)
      }
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-text-primary">{t("notFound")}</h1>
        <p className="mt-2 text-text-muted">{t("notFoundDesc")}</p>
        <Link href="/products" className="mt-6 inline-block">
          <Button variant="outline">{tc("backToProducts")}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary">
        <ChevronLeft className="h-4 w-4" /> {tc("backToProducts")}
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-light to-[#3d3d3d] p-6 sm:p-12">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-secondary/20 sm:h-40 sm:w-40">
                  <SprayCan className="h-12 w-12 text-secondary sm:h-20 sm:w-20" />
                </div>
                <p className="text-sm text-text-muted">{product.category}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`h-14 w-14 rounded-lg border-2 sm:h-16 sm:w-16 ${
                  i === selectedImage ? "border-secondary" : "border-border-dark"
                } bg-primary-light transition-colors hover:border-secondary/50`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="default">Best Seller</Badge>
            </div>
            <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{product.name}</h1>
            <StarRating rating={product.rating} size="md" showCount count={product.sold_count} />
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-secondary sm:text-3xl">{formatPrice(product.price)}</span>
          </div>

          <p className="leading-relaxed text-text-muted">{product.description}</p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-text-primary">{tc("quantity")}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-dark bg-primary-light text-text-primary hover:bg-[#3d3d3d]"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex h-9 w-12 items-center justify-center text-sm font-medium text-text-primary">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-dark bg-primary-light text-text-primary hover:bg-[#3d3d3d]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-xs text-text-muted">
                {product.stock > 0 ? t("inStock", { count: product.stock }) : tc("outOfStock")}
              </span>
            </div>

            <Button className="w-full gap-2" size="lg">
              <ShoppingBag className="h-5 w-5" /> {tc("addToCart")}
            </Button>
          </div>

          <div className="border-t border-border-dark pt-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Leaf, text: t("naturalIngredients") },
                { icon: Shield, text: t("safeOnAllMaterials") },
                { icon: Truck, text: t("freeShippingOver") },
                { icon: Star, text: t("baliMadePremium") },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 shrink-0 text-secondary" />
                  <span className="text-[11px] leading-tight text-text-muted sm:text-xs">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16 border-t border-border-dark pt-12">
        <h2 className="mb-6 text-2xl font-bold text-text-primary">
          {t("reviewsFromShopee")}
          <span className="ml-2 rounded bg-secondary/20 px-2 py-0.5 text-xs font-medium text-secondary">Sync</span>
        </h2>
        {reviews.length === 0 ? (
          <p className="text-sm text-text-muted">{t("noReviews")}</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-xl bg-primary-light p-5">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 text-xs font-medium text-secondary">
                    {review.author_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{review.author_name}</p>
                    <p className="text-xs text-text-muted">{new Date(review.created_at).toLocaleDateString("id-ID")}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
