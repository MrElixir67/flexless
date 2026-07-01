import { getTranslations } from "next-intl/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
} from "lucide-react"
import { FaInstagram, FaTiktok, FaThreads } from "react-icons/fa6"
import { HiMapPin } from "react-icons/hi2"

export default async function ContactPage() {
  const t = await getTranslations("contact")

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <Badge variant="default" className="mx-auto w-fit">{t("badge")}</Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="text-lg leading-relaxed text-text-muted">
              {t("heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="border-t border-border-dark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">{t("formTitle")}</h2>
                <p className="mt-2 text-text-muted">{t("formDesc")}</p>
              </div>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">{t("name")}</label>
                    <input
                      type="text"
                      placeholder={t("namePlaceholder")}
                      className="w-full rounded-lg border border-border-dark bg-primary-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">{t("email")}</label>
                    <input
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className="w-full rounded-lg border border-border-dark bg-primary-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">{t("subject")}</label>
                  <input
                    type="text"
                    placeholder={t("subjectPlaceholder")}
                    className="w-full rounded-lg border border-border-dark bg-primary-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">{t("message")}</label>
                  <textarea
                    rows={5}
                    placeholder={t("messagePlaceholder")}
                    className="w-full resize-none rounded-lg border border-border-dark bg-primary-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  {t("sendMessage")}
                </Button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">{t("infoTitle")}</h2>
                <p className="mt-2 text-text-muted">{t("infoDesc")}</p>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Mail className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{t("emailLabel")}</p>
                    <p className="text-sm text-text-muted">hello@flexless.id</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{t("phoneLabel")}</p>
                    <p className="text-sm text-text-muted">+62 812 3456 7890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <MessageCircle className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">WhatsApp</p>
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-secondary hover:text-secondary-hover"
                    >
                      {t("whatsappText")}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{t("locationLabel")}</p>
                    <p className="text-sm text-text-muted">Jl. Pulau Nias No.2A, Dauh Puri Klod, Denpasar Barat, Bali 80114</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Clock className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{t("hoursLabel")}</p>
                    <p className="text-sm text-text-muted">{t("hoursDetail")}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-text-primary">{t("followUs")}</h3>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                  <a href="https://www.tiktok.com/@flexlessofficial" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-border-dark px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-primary-light hover:text-text-primary sm:px-4">
                    <FaTiktok className="h-4 w-4" />
                    TikTok
                  </a>
                  <a href="https://www.instagram.com/flexless.id/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-border-dark px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-primary-light hover:text-text-primary sm:px-4">
                    <FaInstagram className="h-4 w-4" />
                    Instagram
                  </a>
                  <a href="https://www.threads.com/@flexless.id" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-border-dark px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-primary-light hover:text-text-primary sm:px-4">
                    <FaThreads className="h-4 w-4" />
                    Threads
                  </a>
                  <a href="https://shopee.co.id/flexless_id" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-border-dark px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-primary-light hover:text-text-primary sm:px-4">
                    <img src="/logo/shopee.svg" alt="Shopee" className="h-4 w-4" />
                    Shopee
                  </a>
                  <a href="https://www.tokopedia.com/flexlessid" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-border-dark px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-primary-light hover:text-text-primary sm:px-4">
                    <img src="/logo/tokopedia.svg" alt="Tokopedia" className="h-4 w-4" />
                    Tokopedia
                  </a>
                  <a href="https://www.google.com/maps?q=Hype+Premium+Shoes+%26+Bag+Care,+Jl.+Pulau+Nias+No.2A,+Dauh+Puri+Klod,+Denpasar+Barat,+Denpasar+City,+Bali+80114&ftid=0x2dd24194b851b18d:0x7918904cef70b58&hl=en-ID&gl=id&entry=gps&lucs=,47071704,47069508&g_ep=CAISBjYuNjQuMxgAIMi8ByoSLDQ3MDcxNzA0LDQ3MDY5NTA4QgJJRA%3D%3D&skid=43479e0f-29f8-4681-9868-5b400effafe5&g_st=ic" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-border-dark px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-primary-light hover:text-text-primary sm:px-4">
                    <HiMapPin className="h-4 w-4" />
                    Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-border-dark bg-primary-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center space-y-3">
            <h2 className="text-2xl font-bold text-text-primary">{t("mapTitle")}</h2>
            <p className="text-text-muted">{t("mapDesc")}</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border-dark">
            <iframe
              src="https://maps.google.com/maps?q=Hype+Premium+Shoes+%26+Bag+Care,+Jl.+Pulau+Nias+No.2A,+Dauh+Puri+Klod,+Denpasar+Barat,+Denpasar+City,+Bali+80114&t=&z=17&ie=UTF8&iwloc=&output=embed&ftid=0x2dd24194b851b18d:0x7918904cef70b58"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Flexless Location"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
