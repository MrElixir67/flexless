"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const t = useTranslations("login")

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4 py-12">
      <div className="w-full space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20">
            <span className="text-xl font-bold text-secondary">F</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">{t("welcomeBack")}</h1>
          <p className="mt-1 text-sm text-text-muted">{t("signInDesc")}</p>
        </div>

        <div className="rounded-xl bg-primary-light p-6 space-y-4">
          <Input label={t("email")} id="email" type="email" placeholder="your@email.com" />
          <Input label={t("password")} id="password" type="password" placeholder="••••••••" />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-secondary" />
              <span className="text-text-muted">{t("rememberMe")}</span>
            </label>
            <a href="#" className="text-secondary hover:text-secondary-hover">{t("forgotPassword")}</a>
          </div>
          <Button className="w-full">{t("signIn")}</Button>
        </div>

        <p className="text-center text-sm text-text-muted">
          {t("noAccount")}{" "}
          <a href="#" className="font-medium text-secondary hover:text-secondary-hover">{t("createOne")}</a>
        </p>
      </div>
    </div>
  )
}
