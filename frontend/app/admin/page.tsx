"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, ArrowUpRight } from "lucide-react"

export default function AdminDashboard() {
  const t = useTranslations("admin")

  const stats = [
    { label: "Total Revenue", value: "Rp 28.5M", change: "+12.5%", icon: DollarSign },
    { label: t("orders"), value: "156", change: "+8.2%", icon: ShoppingBag },
    { label: t("products"), value: "8", change: "+2", icon: Package },
    { label: t("customers"), value: "892", change: "+24.1%", icon: Users },
  ]

  const recentOrders = [
    { id: "FLE-001", customer: "Budi S.", date: "2026-06-25", total: 135000, status: "paid" as const },
    { id: "FLE-002", customer: "Sari W.", date: "2026-06-24", total: 85000, status: "shipping" as const },
    { id: "FLE-003", customer: "Dewi K.", date: "2026-06-24", total: 205000, status: "completed" as const },
    { id: "FLE-004", customer: "Andi P.", date: "2026-06-23", total: 50000, status: "pending" as const },
  ]

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-400",
    paid: "bg-blue-500/10 text-blue-400",
    shipping: "bg-purple-500/10 text-purple-400",
    completed: "bg-green-500/10 text-green-400",
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">{t("dashboard")}</h1>
          <p className="mt-1 text-sm text-text-muted">{t("manageStore")}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products">
            <Button variant="outline" size="sm">{t("products")}</Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="outline" size="sm">{t("orders")}</Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-primary-light p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <stat.icon className="h-5 w-5 text-secondary" />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-green-400">
                <ArrowUpRight className="h-3 w-3" /> {stat.change}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-sm text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-xl bg-primary-light p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">{t("recentOrders")}</h2>
            <Link href="/admin/orders" className="text-sm text-secondary hover:text-secondary-hover">{t("viewAll")}</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-lg bg-primary p-3">
                <div>
                  <p className="text-sm font-medium text-text-primary">{order.id}</p>
                  <p className="text-xs text-text-muted">{order.customer} · {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">{formatPrice(order.total)}</p>
                  <Badge variant={order.status === "completed" ? "default" : "new"}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl bg-primary-light p-6">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">{t("quickActions")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/products" className="flex flex-col items-center gap-2 rounded-lg border border-border-dark p-4 transition-colors hover:border-secondary/50">
              <Package className="h-6 w-6 text-secondary" />
              <span className="text-sm font-medium text-text-primary">{t("manageProducts")}</span>
            </Link>
            <Link href="/admin/orders" className="flex flex-col items-center gap-2 rounded-lg border border-border-dark p-4 transition-colors hover:border-secondary/50">
              <ShoppingBag className="h-6 w-6 text-secondary" />
              <span className="text-sm font-medium text-text-primary">{t("viewOrders")}</span>
            </Link>
            <div className="flex flex-col items-center gap-2 rounded-lg border border-border-dark p-4 transition-colors hover:border-secondary/50">
              <TrendingUp className="h-6 w-6 text-secondary" />
              <span className="text-sm font-medium text-text-primary">{t("salesReport")}</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border border-border-dark p-4 transition-colors hover:border-secondary/50">
              <Users className="h-6 w-6 text-secondary" />
              <span className="text-sm font-medium text-text-primary">{t("customers")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
