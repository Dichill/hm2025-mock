/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/api/application/:path*",
                destination: "https://hackmesa.com/api/application/:path*",
            },
            {
                source: "/api/user/:path*",
                destination: "https://hackmesa.com/api/user/:path*",
            },
        ];
    },
};

module.exports = nextConfig;
