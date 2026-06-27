"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Menu, Search, ShoppingBag, X } from "lucide-react"


const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const locale = useLocale()
  const t = useTranslations("nav")
  const router = useRouter()

  const switchLocale = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`
    router.refresh()
  }

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

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => switchLocale(locale === "id" ? "en" : "id")}
            className="relative hidden sm:block h-7 w-[60px] rounded-md border border-border-dark bg-primary-light overflow-hidden"
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute top-0.5 h-[24px] w-[27px] rounded bg-secondary border border-secondary/30 transition-all duration-200 ease-out ${
                locale === "en" ? "left-[calc(50%+1px)]" : "left-0.5"
              }`}
            />
            <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-between px-[10px] z-10">
              <span className={`pointer-events-none text-[11px] font-semibold ${locale === "id" ? "text-primary" : "text-text-muted"}`}>
                ID
              </span>
              <span className={`pointer-events-none text-[11px] font-semibold ${locale === "en" ? "text-primary" : "text-text-muted"}`}>
                EN
              </span>
            </span>
          </button>

          <button className="rounded-lg p-2 text-text-primary/80 transition-colors hover:text-text-primary">
            <Search className="h-5 w-5" />
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
        <div className="border-t border-border-dark bg-primary px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-2 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-text-primary/80 transition-colors hover:bg-primary-light"
              >
                {t(link.key)}
              </Link>
            ))}
            <hr className="border-border-dark" />
            <button
              onClick={() => switchLocale(locale === "id" ? "en" : "id")}
              className="rounded-lg px-3 py-2 text-left text-sm font-medium text-text-primary/80"
            >
              {locale === "id" ? t("switchToEnglish") : t("switchToIndonesian")}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
