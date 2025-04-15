import React from "react";
import type { Metadata } from "next";
import ClientLayout from "./layout-client";

export const metadata: Metadata = {
    title: "Admin Dashboard | HackMESA",
    description: "Admin Dashboard for HackMESA 2025",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ClientLayout>{children}</ClientLayout>;
}
