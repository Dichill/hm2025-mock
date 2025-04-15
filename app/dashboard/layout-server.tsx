import React from "react";
import type { Metadata } from "next";
import ClientLayout from "@/app/dashboard/layout-client";

export const metadata: Metadata = {
    title: "Dashboard | HackMESA",
    description: "Manage your HackMESA participation and account",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ClientLayout>{children}</ClientLayout>;
}
