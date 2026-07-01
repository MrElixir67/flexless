"use client"

import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"

const orders = [
  { id: "FLE-001", customer: "Budi S.", date: "25 Jun 2026", total: 135000, status: "paid" as const, items: 2 },
  { id: "FLE-002", customer: "Sari W.", date: "24 Jun 2026", total: 85000, status: "shipping" as const, items: 1 },
  { id: "FLE-003", customer: "Dewi K.", date: "24 Jun 2026", total: 205000, status: "completed" as const, items: 3 },
  { id: "FLE-004", customer: "Andi P.", date: "23 Jun 2026", total: 50000, status: "pending" as const, items: 1 },
  { id: "FLE-005", customer: "Rudi S.", date: "22 Jun 2026", total: 135000, status: "paid" as const, items: 2 },
]

export default function AdminOrdersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Orders</h1>
        <p className="text-sm text-text-muted">{orders.length} orders</p>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 sm:hidden">
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border border-border-dark bg-primary-light p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-medium text-text-primary">{order.id}</p>
              <Badge variant={order.status === "completed" ? "default" : "new"}>{order.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-text-muted">Customer</p>
                <p className="text-text-primary">{order.customer}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Date</p>
                <p className="text-text-primary">{order.date}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Total</p>
                <p className="font-medium text-text-primary">{formatPrice(order.total)}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Items</p>
                <p className="text-text-primary">{order.items}</p>
              </div>
            </div>
            <div className="text-right">
              <button className="text-sm text-secondary hover:text-secondary-hover">Update</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-border-dark sm:block">
        <table className="w-full text-sm">
          <thead className="bg-primary-light">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-text-muted">Order</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">Customer</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">Date</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">Total</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">Status</th>
              <th className="px-4 py-3 text-right font-medium text-text-muted">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dark">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-primary-light/50">
                <td className="px-4 py-3 font-medium text-text-primary">{order.id}</td>
                <td className="px-4 py-3 text-text-muted">{order.customer}</td>
                <td className="px-4 py-3 text-text-muted">{order.date}</td>
                <td className="px-4 py-3 font-medium text-text-primary">{formatPrice(order.total)}</td>
                <td className="px-4 py-3">
                  <Badge variant={order.status === "completed" ? "default" : "new"}>{order.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-sm text-secondary hover:text-secondary-hover">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
