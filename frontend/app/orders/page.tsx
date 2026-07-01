"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { Package } from "lucide-react"

const orders = [
  { code: "FLE-20260625-001", date: "25 Jun 2026", total: 135000, status: "completed" as const, items: 2 },
  { code: "FLE-20260620-002", date: "20 Jun 2026", total: 85000, status: "shipping" as const, items: 1 },
  { code: "FLE-20260615-003", date: "15 Jun 2026", total: 50000, status: "completed" as const, items: 1 },
]

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-400",
  paid: "bg-blue-500/10 text-blue-400",
  shipping: "bg-purple-500/10 text-purple-400",
  completed: "bg-green-500/10 text-green-400",
}

export default function OrdersPage() {
  const t = useTranslations("orders")
  const tc = useTranslations("common")

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-text-primary">{t("title")}</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Package className="mb-4 h-16 w-16 text-text-muted" />
          <p className="text-lg font-medium text-text-primary">{t("empty")}</p>
          <p className="mt-1 text-sm text-text-muted">{t("emptyDesc")}</p>
          <Link href="/products" className="mt-6">
            <Button>{tc("browseProducts")}</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.code}
              href={`/orders/${order.code}`}
              className="flex flex-col gap-3 rounded-xl bg-primary-light p-5 transition-colors hover:bg-[#3d3d3d] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <p className="font-medium text-text-primary">{order.code}</p>
                <p className="text-sm text-text-muted">{order.date} · {order.items} {tc("items")}</p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-1">
                <p className="font-medium text-text-primary">{formatPrice(order.total)}</p>
                <Badge variant={order.status === "completed" ? "default" : "new"}>
                  {order.status}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
