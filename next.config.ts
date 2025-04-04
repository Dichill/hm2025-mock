import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en"], // Add your supported languages
    defaultLocale: "en",   // Default language for the site
  },
};

export default nextConfig;
