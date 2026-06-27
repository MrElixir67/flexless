import Link from "next/link"
import { StarRating } from "@/components/ui/StarRating"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { SprayCan, Droplets, Package, Brush, Sparkles, Paintbrush, SprayCanIcon, Hand } from "lucide-react"

interface ProductCardProduct {
  slug: string
  name: string
  price: number
  rating: number
  category: string
  sold_count?: number
  reviewCount?: number
}

interface ProductCardProps {
  product: ProductCardProduct
}

const categoryIcons: Record<string, typeof SprayCan> = {
  cleaner: SprayCan,
  treatment: Sparkles,
  brush: Paintbrush,
  accessory: Hand,
  kit: Package,
}

const categoryLabels: Record<string, string> = {
  cleaner: "Cleaner",
  treatment: "Treatment",
  brush: "Brush",
  accessory: "Accessory",
  kit: "Kit",
}

export function ProductCard({ product }: ProductCardProps) {
  const Icon = categoryIcons[product.category] || Package
  const label = categoryLabels[product.category] || product.category

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl bg-primary-light transition-colors">
        <div className="relative aspect-square bg-gradient-to-br from-primary-light to-[#3d3d3d]">
          <div className="flex h-full items-center justify-center p-8">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20">
                <Icon className="h-10 w-10 text-secondary" />
              </div>
              <p className="text-xs text-text-muted">{label}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 p-4">
          <h3 className="font-medium text-text-primary line-clamp-1">
            {product.name}
          </h3>
          <StarRating rating={product.rating} size="sm" showCount count={product.sold_count || product.reviewCount || 0} />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-secondary">{formatPrice(product.price)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
