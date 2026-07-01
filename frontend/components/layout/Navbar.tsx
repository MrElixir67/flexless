"use client"

import Link from "next/link"
import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Globe, Menu, ShoppingBag, X } from "lucide-react"


const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [animatingLocale, setAnimatingLocale] = useState<string | null>(null)
  const locale = useLocale()
  const t = useTranslations("nav")

  const displayLocale = animatingLocale ?? locale

  const switchLocale = (newLocale: string) => {
    if (animatingLocale || newLocale === locale) return
    setAnimatingLocale(newLocale)
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`
    setTimeout(() => {
      window.location.reload()
    }, 300)
  }

  const isEn = displayLocale === "en"
  const isId = displayLocale === "id"

  return (
    <header className="sticky top-0 z-50 border-b border-border-dark bg-primary">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary text-xs font-bold text-primary">
            F
          </div>
          <span className="text-lg font-bold tracking-tight text-text-primary">FLEXLESS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-primary/80 transition-colors hover:text-text-primary"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => switchLocale(isId ? "en" : "id")}
            disabled={!!animatingLocale}
            aria-label={isId ? t("switchToEnglish") : t("switchToIndonesian")}
            className="group relative hidden h-8 w-16 items-center rounded-full border border-border-dark bg-primary-light p-0.5 shadow-inner transition-colors hover:border-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:flex"
            suppressHydrationWarning
          >
            <span
              aria-hidden
              suppressHydrationWarning
              className={`pointer-events-none absolute left-0.5 top-0.5 h-7 w-7 rounded-full bg-secondary shadow-md transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isEn ? "translate-x-8" : "translate-x-0"
              }`}
            />
            <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-between px-[9px]">
              <span
                suppressHydrationWarning
                className={`pointer-events-none text-[10px] font-bold uppercase tracking-wide transition-colors duration-200 ${
                  isId ? "text-primary" : "text-text-muted group-hover:text-text-primary/60"
                }`}
              >
                ID
              </span>
              <span
                suppressHydrationWarning
                className={`pointer-events-none text-[10px] font-bold uppercase tracking-wide transition-colors duration-200 ${
                  isEn ? "text-primary" : "text-text-muted group-hover:text-text-primary/60"
                }`}
              >
                EN
              </span>
            </span>
          </button>

          <Link
            href="/cart"
            className="relative rounded-lg p-2 text-text-primary/80 transition-colors hover:text-text-primary"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-primary">
              0
            </span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-text-primary/80 transition-colors hover:text-text-primary md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-full border-b border-border-dark bg-primary px-4 pb-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-text-primary/80 transition-colors hover:bg-primary-light"
              >
                {t(link.key)}
              </Link>
            ))}
            <hr className="my-2 border-border-dark" />
            <button
              onClick={() => switchLocale(locale === "id" ? "en" : "id")}
              disabled={!!animatingLocale}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-text-primary/80 transition-colors hover:bg-primary-light"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-text-primary">
                <Globe className="h-4 w-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-xs text-text-muted">
                  {locale === "id" ? "Bahasa saat ini" : "Current language"}
                </span>
                <span className="font-semibold text-text-primary">
                  {locale === "id" ? "Indonesia" : "English"}
                </span>
              </span>
              <span className="ml-auto text-xs text-secondary">
                {locale === "id" ? t("switchToEnglish") : t("switchToIndonesian")}
              </span>
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
