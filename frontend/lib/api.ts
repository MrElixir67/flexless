const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface ApiProduct {
  id: string
  slug: string
  name: string
  name_en: string | null
  description: string
  description_en: string | null
  price: number
  stock: number
  images: string | null
  category: string
  shopee_url: string | null
  shopee_item_id: string | null
  rating: number
  sold_count: number
  is_active: boolean
  created_at: string
}

export interface ApiReview {
  id: string
  product_id: string
  author_name: string
  rating: number
  comment: string | null
  source: string | null
  shopee_review_id: string | null
  created_at: string
}

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function getProducts(): Promise<ApiProduct[]> {
  return fetchApi("/api/products")
}

export async function getProductBySlug(slug: string): Promise<ApiProduct | null> {
  try {
    return await fetchApi(`/api/products/${slug}`)
  } catch {
    return null
  }
}

export async function getProductReviews(productId: string): Promise<ApiReview[]> {
  try {
    return await fetchApi(`/api/products/${productId}/reviews`)
  } catch {
    return []
  }
}
