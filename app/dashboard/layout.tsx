import React from "react";
import type { Metadata } from "next";

/**
 * Metadata for the dashboard page
 */
export const metadata: Metadata = {
    title: "Dashboard | HackMESA",
    description: "Manage your HackMESA participation and account",
};

/**
 * Layout component for the dashboard
 * Provides consistent layout structure for all dashboard pages
 */
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
}
