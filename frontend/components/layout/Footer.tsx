"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { FaInstagram, FaTiktok, FaShopify, FaThreads, FaBagShopping } from "react-icons/fa6"
import { HiMapPin } from "react-icons/hi2"

export function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="border-t border-border-dark bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary text-xs font-bold text-primary">
                F
              </div>
              <span className="text-lg font-bold text-text-primary">FLEXLESS</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-primary">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm text-text-muted transition-colors hover:text-text-primary">{t("products")}</Link></li>
              <li><Link href="/about" className="text-sm text-text-muted transition-colors hover:text-text-primary">{t("aboutUs")}</Link></li>
              <li><Link href="/contact" className="text-sm text-text-muted transition-colors hover:text-text-primary">{t("contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-primary">{t("support")}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-text-muted transition-colors hover:text-text-primary">{t("faq")}</Link></li>
              <li><Link href="/" className="text-sm text-text-muted transition-colors hover:text-text-primary">{t("shippingInfo")}</Link></li>
              <li><Link href="/" className="text-sm text-text-muted transition-colors hover:text-text-primary">{t("returns")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-primary">{t("followUs")}</h3>
            <p className="mb-3 text-sm text-text-muted">{t("followUsDesc")}</p>
            <div className="flex flex-wrap gap-1">
              <a href="https://www.tiktok.com/@flexlessofficial" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2.5 text-text-muted transition-colors hover:bg-primary-light hover:text-text-primary" aria-label="TikTok">
                <FaTiktok className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/flexless.id/" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2.5 text-text-muted transition-colors hover:bg-primary-light hover:text-text-primary" aria-label="Instagram">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://www.threads.com/@flexless.id" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2.5 text-text-muted transition-colors hover:bg-primary-light hover:text-text-primary" aria-label="Threads">
                <FaThreads className="h-5 w-5" />
              </a>
              <a href="https://shopee.co.id/flexless_id" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2.5 text-text-muted transition-colors hover:bg-primary-light hover:text-text-primary" aria-label="Shopee">
                <FaShopify className="h-5 w-5" />
              </a>
              <a href="https://www.tokopedia.com/flexlessid" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2.5 text-text-muted transition-colors hover:bg-primary-light hover:text-text-primary" aria-label="Tokopedia">
                <FaBagShopping className="h-5 w-5" />
              </a>
              <a href="https://www.google.com/maps?q=Hype+Premium+Shoes+%26+Bag+Care,+Jl.+Pulau+Nias+No.2A,+Dauh+Puri+Klod,+Denpasar+Barat,+Denpasar+City,+Bali+80114&ftid=0x2dd24194b851b18d:0x7918904cef70b58&hl=en-ID&gl=id&entry=gps&lucs=,47071704,47069508&g_ep=CAISBjYuNjQuMxgAIMi8ByoSLDQ3MDcxNzA0LDQ3MDY5NTA4QgJJRA%3D%3D&skid=43479e0f-29f8-4681-9868-5b400effafe5&g_st=ic" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2.5 text-text-muted transition-colors hover:bg-primary-light hover:text-text-primary" aria-label="Google Maps">
                <HiMapPin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border-dark pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-text-muted">
              &copy; 2026 Flexless. {t("allRightsReserved")}
            </p>
            <div className="flex gap-4 text-xs text-text-muted">
              <span>{t("paymentMethods")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
