import { getTranslations } from "next-intl/server"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AboutPage() {
  const t = await getTranslations("about")
  const tc = await getTranslations("common")

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <Badge variant="default" className="w-fit">{t("badge")}</Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl">
                {t("heroTitle")}
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-text-muted">
                {t("heroDesc")}
              </p>
              <Link href="/products">
                <Button size="lg">{tc("shopNow")}</Button>
              </Link>
            </div>
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-light to-[#3d3d3d] p-12">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-secondary/20">
                      <Sparkles className="h-16 w-16 text-secondary" />
                    </div>
                    <p className="text-lg font-medium text-text-primary">Premium Shoe Care</p>
                    <p className="mt-1 text-sm text-text-muted">Made in Bali, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="border-y border-border-dark bg-primary-light">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl font-bold text-text-primary">{t("storyTitle")}</h2>
            <p className="text-lg leading-relaxed text-text-muted">
              {t("storyDesc")}
            </p>
            <p className="text-lg leading-relaxed text-text-muted">
              {t("storyDesc2")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center space-y-3">
            <h2 className="text-3xl font-bold text-text-primary">{t("missionTitle")}</h2>
            <p className="mx-auto max-w-2xl text-text-muted">{t("missionDesc")}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Shield, title: t("quality"), desc: t("qualityDesc") },
              { icon: Leaf, title: t("sustainability"), desc: t("sustainabilityDesc") },
              { icon: Award, title: t("premiumMaterials"), desc: t("premiumMaterialsDesc") },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-primary-light p-8 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
                  <item.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Flexless */}
      <section className="border-y border-border-dark bg-primary-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center space-y-3">
            <h2 className="text-3xl font-bold text-text-primary">{t("whyTitle")}</h2>
            <p className="mx-auto max-w-2xl text-text-muted">{t("whyDesc")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Droplets, title: t("naturalFormula"), desc: t("naturalFormulaDesc") },
              { icon: Leaf, title: t("ecoFriendly"), desc: t("ecoFriendlyDesc") },
              { icon: Heart, title: t("trustedByCustomers"), desc: t("trustedByCustomersDesc") },
              { icon: CheckCircle, title: t("safeForAll"), desc: t("safeForAllDesc") },
              { icon: Recycle, title: t("extendShoeLife"), desc: t("extendShoeLifeDesc") },
              { icon: Award, title: t("madeInBali"), desc: t("madeInBaliDesc") },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-xl bg-primary p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                  <item.icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">{item.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-text-primary">{t("visitTitle")}</h2>
              <p className="text-text-muted leading-relaxed">{t("visitDesc")}</p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{t("location")}</p>
                    <p className="text-sm text-text-muted">Bali, Indonesia</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Clock className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{t("operatingHours")}</p>
                    <p className="text-sm text-text-muted">{t("hoursDetail")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-border-dark bg-primary-light p-12">
              <div className="text-center space-y-4">
                <MapPin className="mx-auto h-16 w-16 text-secondary" />
                <p className="text-lg font-medium text-text-primary">Bali, Indonesia</p>
                <p className="text-sm text-text-muted">{t("mapPlaceholder")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border-dark py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">{t("ctaTitle")}</h2>
          <p className="text-text-muted">{t("ctaDesc")}</p>
          <div className="flex flex-wrap justify-center gap-3">
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
