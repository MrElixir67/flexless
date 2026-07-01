"use client"

import { use } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { ChevronLeft, Package, Truck, SprayCan, CheckCircle, Clock, MapPin, CreditCard } from "lucide-react"

const orderStatuses = [
  { key: "pending", label: "Order Placed", icon: Clock, completed: true, date: "23 Jun 2026, 14:30" },
  { key: "processing", label: "Processing", icon: Package, completed: true, date: "23 Jun 2026, 16:45" },
  { key: "shipped", label: "Shipped", icon: Truck, completed: true, date: "24 Jun 2026, 09:15" },
  { key: "delivered", label: "Delivered", icon: CheckCircle, completed: true, date: "25 Jun 2026, 11:20" },
]

export default function OrderDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params)

  const t = useTranslations("orders")
  const tc = useTranslations("common")

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/orders" className="mb-6 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary">
        <ChevronLeft className="h-4 w-4" /> {tc("backToOrders")}
      </Link>

      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary sm:text-2xl">{t("title")} {code}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="text-sm text-text-muted">25 Jun 2026</span>
            <Badge variant="default">{t("status")}: Delivered</Badge>
          </div>
        </div>

        {/* Order Tracking Progress */}
        <div className="rounded-xl bg-primary-light p-6">
          <h3 className="mb-6 text-sm font-semibold text-text-primary">{t("tracking")}</h3>
          <div className="relative">
            {orderStatuses.map((status, index) => (
              <div key={status.key} className="flex gap-4 pb-8 last:pb-0">
                <div className="relative flex flex-col items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    status.completed
                      ? "bg-secondary text-primary"
                      : "bg-primary-light border-2 border-border-dark text-text-muted"
                  }`}>
                    <status.icon className="h-5 w-5" />
                  </div>
                  {index < orderStatuses.length - 1 && (
                    <div className={`mt-2 h-12 w-0.5 ${
                      status.completed ? "bg-secondary" : "bg-border-dark"
                    }`} />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <p className={`font-medium ${
                    status.completed ? "text-text-primary" : "text-text-muted"
                  }`}>{status.label}</p>
                  <p className="mt-1 text-sm text-text-muted">{status.date}</p>
                  {status.key === "shipped" && (
                    <p className="mt-1 text-sm text-text-muted">JNE REG — JNE1234567890</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl bg-primary-light p-5">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">{t("shippingInfo")}</h3>
            <div className="space-y-2 text-sm">
              <p className="text-text-muted">Budi Santoso</p>
              <p className="text-text-muted">08123456789</p>
              <p className="text-text-muted">Jl. Raya Kuta No. 123, Kuta, Badung, Bali 80361</p>
            </div>
          </div>
          <div className="rounded-xl bg-primary-light p-5">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">{t("paymentMethod")}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-secondary" />
                <span className="text-text-muted">QRIS</span>
              </div>
              <p className="text-text-muted">{t("status")}: Paid</p>
              <p className="text-text-muted">23 Jun 2026, 14:35</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-primary-light p-5">
          <h3 className="mb-4 text-sm font-semibold text-text-primary">{tc("items")}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <SprayCan className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">Premium Shoe Cleaner 500ml</p>
                <p className="text-xs text-text-muted">x2</p>
              </div>
              <p className="text-sm font-medium text-text-primary">{formatPrice(170000)}</p>
            </div>
          </div>
          <hr className="my-3 border-border-dark" />
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">{tc("subtotal")}</span>
              <span className="text-text-primary">{formatPrice(120000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">{tc("shipping")}</span>
              <span className="text-text-primary">{formatPrice(15000)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-text-primary">{tc("total")}</span>
              <span className="text-secondary">{formatPrice(135000)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" className="w-full gap-2 sm:w-auto"><Package className="h-4 w-4" /> {tc("trackPackage")}</Button>
        </div>
      </div>
    </div>
  )
}
