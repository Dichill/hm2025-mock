import React from "react";
import type { Metadata } from "next";
import ClientLayout from "./layout-client";
import { UserProvider } from "@/app/context/UserContext";
import { SettingsProvider } from "@/app/context/SettingsContext";

export const metadata: Metadata = {
    title: "Judge Dashboard | HackMESA",
    description: "Judging interface for HackMESA projects",
};

export default function GraceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <UserProvider>
            <SettingsProvider>
                <ClientLayout>{children}</ClientLayout>
            </SettingsProvider>
        </UserProvider>
    );
}
