import { getRequestConfig } from "next-intl/server"
import { hasLocale } from "next-intl"
import { headers } from "next/headers"
import { routing } from "./routing"

function getLocaleFromCookies(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined
  const match = cookieHeader.match(/NEXT_LOCALE=([^;]+)/)
  return match?.[1]
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const cookieHeader = (await headers()).get("cookie")
  const cookieLocale = getLocaleFromCookies(cookieHeader)
  const resolvedLocale = cookieLocale ?? requested
  const locale = hasLocale(routing.locales, resolvedLocale) ? resolvedLocale : routing.defaultLocale

  return {
    locale,
    timeZone: "Asia/Makassar",
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
