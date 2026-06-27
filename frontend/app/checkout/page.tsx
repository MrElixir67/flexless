"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/utils"
import { ChevronLeft, CreditCard, Smartphone, Wallet, Building } from "lucide-react"

export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment">("shipping")
  const [selectedCourier, setSelectedCourier] = useState("jne")
  const [selectedService, setSelectedService] = useState("reg")

  const t = useTranslations("checkout")
  const tc = useTranslations("common")

  const subtotal = 305000
  const shippingCost = selectedService === "reg" ? 15000 : selectedService === "yes" ? 45000 : 25000
  const total = subtotal + shippingCost

  const couriers = [
    { id: "jne", name: "JNE" },
    { id: "sicepat", name: "SiCepat" },
    { id: "anteraja", name: "AnterAja" },
  ]

  const services = [
    { id: "reg", name: "Regular", est: "3-5 days", cost: 15000 },
    { id: "yes", name: "YES", est: "1-2 days", cost: 45000 },
    { id: "ekonomi", name: "Ekonomi", est: "5-7 days", cost: 10000 },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/cart" className="mb-6 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary">
        <ChevronLeft className="h-4 w-4" /> {tc("backToCart")}
      </Link>

      <h1 className="mb-8 text-3xl font-bold text-text-primary">{t("title")}</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Shipping Address */}
          <section className="rounded-xl bg-primary-light p-6">
            <h2 className="mb-4 text-lg font-semibold text-text-primary">{t("shippingAddress")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label={t("fullName")} id="name" defaultValue="Budi Santoso" />
              <Input label={t("phoneNumber")} id="phone" defaultValue="08123456789" />
              <div className="sm:col-span-2">
                <Input label={t("fullAddress")} id="address" defaultValue="Jl. Raya Kuta No. 123, Kuta, Badung" />
              </div>
              <Input label={t("city")} id="city" defaultValue="Badung" />
              <Input label={t("postalCode")} id="postal" defaultValue="80361" />
            </div>
          </section>

          {/* Shipping Method */}
          <section className="rounded-xl bg-primary-light p-6">
            <h2 className="mb-4 text-lg font-semibold text-text-primary">{t("shippingMethod")}</h2>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm text-text-muted">{t("courier")}</p>
                <div className="flex gap-2">
                  {couriers.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCourier(c.id)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        selectedCourier === c.id
                          ? "border-secondary bg-secondary/10 text-secondary"
                          : "border-border-dark text-text-muted hover:border-text-muted"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm text-text-muted">{t("service")}</p>
                <div className="space-y-2">
                  {services.map((s) => (
                    <label
                      key={s.id}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                        selectedService === s.id
                          ? "border-secondary bg-secondary/10"
                          : "border-border-dark hover:border-text-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="service"
                          value={s.id}
                          checked={selectedService === s.id}
                          onChange={() => setSelectedService(s.id)}
                          className="accent-secondary"
                        />
                        <div>
                          <p className="text-sm font-medium text-text-primary">{s.name}</p>
                          <p className="text-xs text-text-muted">{s.est}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-text-primary">{formatPrice(s.cost)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="rounded-xl bg-primary-light p-6">
            <h2 className="mb-4 text-lg font-semibold text-text-primary">{t("paymentMethod")}</h2>
            <div className="space-y-2">
              {[
                { id: "qris", name: "QRIS", icon: Smartphone },
                { id: "gopay", name: "GoPay", icon: Wallet },
                { id: "va", name: t("virtualAccount"), icon: Building },
                { id: "cc", name: t("creditCard"), icon: CreditCard },
              ].map((pm) => (
                <label
                  key={pm.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border-dark p-3 transition-colors hover:border-text-muted"
                >
                  <input type="radio" name="payment" className="accent-secondary" />
                  <pm.icon className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium text-text-primary">{pm.name}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Order Summary Sidebar */}
        <div className="h-fit rounded-xl bg-primary-light p-6">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">{tc("orderSummary")}</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">{tc("subtotal")} (3 {tc("items")})</span>
              <span className="font-medium text-text-primary">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">{tc("shipping")}</span>
              <span className="font-medium text-text-primary">{formatPrice(shippingCost)}</span>
            </div>
            <hr className="border-border-dark" />
            <div className="flex justify-between text-base">
              <span className="font-semibold text-text-primary">{tc("total")}</span>
              <span className="font-bold text-secondary">{formatPrice(total)}</span>
            </div>
          </div>
          <Button className="mt-6 w-full gap-2">
            <CreditCard className="h-4 w-4" /> {tc("payNow")}
          </Button>
          <p className="mt-3 text-center text-xs text-text-muted">
            {tc("securedPayment")}
          </p>
        </div>
      </div>
    </div>
  )
}
