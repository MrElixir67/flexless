import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.10.10.10"],
}

export default withNextIntl(nextConfig)
