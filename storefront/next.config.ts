import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "saleor-api",
        port: "8000",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SALEOR_API_URL:
      process.env.NEXT_PUBLIC_SALEOR_API_URL ||
      "http://localhost:8000/graphql/",
    NEXT_PUBLIC_DEFAULT_CHANNEL:
      process.env.NEXT_PUBLIC_DEFAULT_CHANNEL || "default-channel",
  },
};

export default withNextIntl(nextConfig);
