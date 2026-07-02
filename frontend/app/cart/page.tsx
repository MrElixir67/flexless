"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, SprayCan, Package } from "lucide-react"

export default function CartPage() {
  const [cartItems] = useState([
    {
      id: "1",
      name: "Premium Shoe Cleaner 500ml",
      price: 85000,
      quantity: 2,
      icon: SprayCan,
    },
    {
      id: "4",
      name: "Complete Care Kit",
      price: 135000,
      quantity: 1,
      icon: Package,
    },
  ])

  const t = useTranslations("cart")
  const tc = useTranslations("common")

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 15000
  const total = subtotal + shipping

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-text-primary sm:mb-8 sm:text-3xl">{t("title")}</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingBag className="mb-4 h-16 w-16 text-text-muted" />
          <p className="text-lg font-medium text-text-primary">{t("empty")}</p>
          <p className="mt-1 text-sm text-text-muted">{t("emptyDesc")}</p>
          <Link href="/products" className="mt-6">
            <Button>{tc("startShopping")}</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-xl bg-primary-light p-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <item.icon className="h-10 w-10 text-secondary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-text-primary truncate">{item.name}</h3>
                    <p className="mt-1 text-sm font-medium text-secondary">{formatPrice(item.price)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 sm:ml-auto">
                  <div className="flex items-center gap-1">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-dark bg-primary text-text-primary hover:bg-[#3d3d3d]">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="flex h-8 w-10 items-center justify-center text-sm font-medium text-text-primary">
                      {item.quantity}
                    </span>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-dark bg-primary text-text-primary hover:bg-[#3d3d3d]">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-right font-medium text-text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button className="p-2 text-text-muted hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-xl bg-primary-light p-6">
            <h2 className="mb-4 text-lg font-semibold text-text-primary">{tc("orderSummary")}</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">{tc("subtotal")}</span>
                <span className="font-medium text-text-primary">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">{tc("shipping")}</span>
                <span className="font-medium text-text-primary">{formatPrice(shipping)}</span>
              </div>
              <hr className="border-border-dark" />
              <div className="flex justify-between text-base">
                <span className="font-semibold text-text-primary">{tc("total")}</span>
                <span className="font-bold text-secondary">{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout">
              <Button className="mt-6 w-full gap-2">
                {tc("proceedToCheckout")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
