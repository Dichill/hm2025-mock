import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            "localhost",
            "s3.amazonaws.com",
            "dev.hackmesa.com",
            "hackmesa.com",
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
    },
};

export default nextConfig;
