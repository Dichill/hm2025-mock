import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Load local fonts
const kievitSans = localFont({
    src: [
        {
            path: "../public/fonts/FF-Kievit-Pro-Light.otf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/FF-Kievit-Pro-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/FF-Kievit-Pro-Medium.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/FF-Kievit-Pro-Extrabold.otf",
            weight: "800",
            style: "normal",
        },
    ],
    variable: "--font-kievit-sans",
});

export const metadata: Metadata = {
    title: "HACKMESA 2025",
    description: "HACKMESA 2025",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${kievitSans.variable} antialiased`}
                suppressHydrationWarning
            >
                {children}
            </body>
        </html>
    );
}
