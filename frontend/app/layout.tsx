import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { getMessages, getLocale } from "next-intl/server"
import { LocaleProvider } from "@/components/providers/locale-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Flexless — Premium Shoe Care from Bali",
  description: "Premium shoe cleaning and care products made in Bali. Treat your shoes with the best.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.className}>
      <body className="flex min-h-screen flex-col bg-primary text-text-primary antialiased">
        <LocaleProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  )
}
