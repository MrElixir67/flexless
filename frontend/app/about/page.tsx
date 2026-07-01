import { getTranslations } from "next-intl/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Leaf,
  Droplets,
  Recycle,
  Award,
  Heart,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle,
  Zap,
  PackageOpen,
  Globe,
} from "lucide-react"
import Link from "next/link"

export default async function AboutPage() {
  const t = await getTranslations("about")
  const tc = await getTranslations("common")

  const stats = [
    { value: "8+", label: "Premium Products" },
    { value: "1.2K+", label: "Happy Customers" },
    { value: "3+", label: "Years of Care" },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light" />
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="default" className="mx-auto w-fit">{t("badge")}</Badge>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              {t("heroTitle")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
              {t("heroDesc")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/products">
                <Button size="lg">{tc("shopNow")}</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">{t("contactUs")}</Button>
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-4 rounded-2xl border border-border-dark bg-primary-light/50 p-6 backdrop-blur-sm sm:gap-8 sm:p-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-secondary sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-text-muted sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light to-[#3d3d3d] p-8 sm:p-12">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/20 sm:h-32 sm:w-32">
                      <Sparkles className="h-12 w-12 text-secondary sm:h-16 sm:w-16" />
                    </div>
                    <p className="text-xl font-semibold text-text-primary sm:text-2xl">Premium Shoe Care</p>
                    <p className="mt-2 text-sm text-text-muted">Made in Bali, Indonesia</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 hidden rounded-xl border border-border-dark bg-primary p-5 shadow-xl lg:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20">
                      <Award className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Trusted Quality</p>
                      <p className="text-xs text-text-muted">Bali crafted since 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 space-y-6 lg:order-2">
              <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">{t("storyTitle")}</h2>
              <p className="text-base leading-relaxed text-text-muted sm:text-lg">
                {t("storyDesc")}
              </p>
              <p className="text-base leading-relaxed text-text-muted sm:text-lg">
                {t("storyDesc2")}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 rounded-lg bg-primary-light px-4 py-2 text-sm text-text-primary">
                  <Leaf className="h-4 w-4 text-secondary" />
                  Eco-Friendly
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-primary-light px-4 py-2 text-sm text-text-primary">
                  <Shield className="h-4 w-4 text-secondary" />
                  Safe for All Materials
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="border-y border-border-dark bg-primary-light py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">{t("missionTitle")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-text-muted">{t("missionDesc")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Shield, title: t("quality"), desc: t("qualityDesc") },
              { icon: Leaf, title: t("sustainability"), desc: t("sustainabilityDesc") },
              { icon: Award, title: t("premiumMaterials"), desc: t("premiumMaterialsDesc") },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-border-dark bg-primary p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:bg-primary-light sm:p-8"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 transition-colors group-hover:bg-secondary/20">
                  <item.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Flexless */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">{t("whyTitle")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-text-muted">{t("whyDesc")}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Droplets, title: t("naturalFormula"), desc: t("naturalFormulaDesc") },
              { icon: Leaf, title: t("ecoFriendly"), desc: t("ecoFriendlyDesc") },
              { icon: Heart, title: t("trustedByCustomers"), desc: t("trustedByCustomersDesc") },
              { icon: CheckCircle, title: t("safeForAll"), desc: t("safeForAllDesc") },
              { icon: Recycle, title: t("extendShoeLife"), desc: t("extendShoeLifeDesc") },
              { icon: Globe, title: t("madeInBali"), desc: t("madeInBaliDesc") },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-border-dark bg-primary-light p-5 transition-colors hover:border-secondary/30"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                  <item.icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border-dark bg-primary-light py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">How It Works</h2>
            <p className="mx-auto mt-3 max-w-2xl text-text-muted">Three simple steps to keep your shoes fresh.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { step: "01", icon: Droplets, title: "Clean", desc: "Apply our natural cleaner and gently brush away dirt and stains." },
              { step: "02", icon: Zap, title: "Protect", desc: "Use our protector spray to guard against water, dust, and future stains." },
              { step: "03", icon: PackageOpen, title: "Wear", desc: "Lace up and step out with shoes that look fresh every day." },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center">
                {index < 2 && (
                  <div className="absolute left-1/2 top-16 hidden h-0.5 w-full -translate-x-0 bg-border-dark sm:block" />
                )}
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
                  <item.icon className="h-7 w-7 text-secondary" />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-secondary">Step {item.step}</p>
                <h3 className="mt-2 text-lg font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">{t("visitTitle")}</h2>
                <p className="mt-3 text-text-muted leading-relaxed">{t("visitDesc")}</p>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{t("location")}</p>
                    <p className="text-sm text-text-muted">Bali, Indonesia</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Clock className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{t("operatingHours")}</p>
                    <p className="text-sm text-text-muted">{t("hoursDetail")}</p>
                  </div>
                </div>
              </div>
              <Link href="/contact">
                <Button variant="outline" size="lg">{t("contactUs")}</Button>
              </Link>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-border-dark bg-primary-light p-10 sm:p-12">
              <div className="text-center">
                <MapPin className="mx-auto h-16 w-16 text-secondary" />
                <p className="mt-4 text-lg font-medium text-text-primary">Bali, Indonesia</p>
                <p className="mt-1 text-sm text-text-muted">{t("mapPlaceholder")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border-dark bg-gradient-to-br from-primary-light to-primary py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-text-muted">{t("ctaDesc")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/products">
              <Button size="lg">{tc("shopNow")}</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">{t("contactUs")}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
