"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { loading, isAuthenticated, userRoles } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push("/login");
                return;
            }

            // Check user roles and redirect if needed
            const judgeRoles = ["JUDGE"];
            const adminRoles = ["SPONSORS", "ORGANIZER"];
            const hackerRoles = ["HACKER"];

            // Validate that user has judge role, otherwise redirect
            if (!userRoles.some((role) => judgeRoles.includes(role))) {
                if (userRoles.some((role) => adminRoles.includes(role))) {
                    router.push("/admin");
                } else if (
                    userRoles.some((role) => hackerRoles.includes(role))
                ) {
                    router.push("/dashboard");
                } else {
                    router.push("/");
                }
            }
        }
    }, [loading, isAuthenticated, userRoles, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-16 h-16 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Router will handle the redirect to login
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
