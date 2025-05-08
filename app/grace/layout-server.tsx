import React from "react";
import type { Metadata } from "next";
import ClientLayout from "./layout-client";

export const metadata: Metadata = {
    title: "Judge Dashboard | HackMESA",
    description: "Judging interface for HackMESA projects",
};

export default function GraceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ClientLayout>{children}</ClientLayout>;
}
