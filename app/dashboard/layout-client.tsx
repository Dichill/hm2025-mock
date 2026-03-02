"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavBar from "@/app/components/DashboardNavBar/DashboardNavBar";
import supabase from "@/lib/supabase/supabase-client";
import { User, DashboardStatus } from "./types";
import { getUserData } from "@/core/user/api/user";
import { USE_DEMO_DATA } from "@/core/mock/demo-mode";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [dashboardStatus, setDashboardStatus] =
        useState<DashboardStatus>("loading");
    const [userRoles, setUserRoles] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);

        const checkAuth = async () => {
            try {
                setLoading(true);
                if (USE_DEMO_DATA) {
                    setUser({
                        id: "demo-user-1",
                        email: "demo.hacker@hackmesa.org",
                    } as User);
                    setDashboardStatus("authenticated");
                    setUserRoles(["HACKER"]);
                    return;
                }
                const { data: sessionData } = await supabase.auth.getSession();

                if (!sessionData.session) {
                    setDashboardStatus("unauthenticated");
                    router.push("/login");
                    return;
                }

                const { data: userData, error } = await supabase.auth.getUser();

                if (error) {
                    console.error("Authentication error:", error);

                    // Handle "user_not_found" error specifically
                    if (
                        error.message?.includes("user_not_found") ||
                        error.code === "user_not_found"
                    ) {
                        console.log(
                            "User from JWT not found in database. Signing out..."
                        );
                        await supabase.auth.signOut();
                    }

                    setDashboardStatus("unauthenticated");
                    router.push("/login");
                    return;
                }

                if (userData.user) {
                    setUser(userData.user as User);
                    setDashboardStatus("authenticated");

                    // Check user roles and redirect if needed
                    try {
                        const userRoleData = await getUserData();
                        const adminRoles = ["SPONSORS", "ORGANIZER"];
                        const judgeRoles = ["JUDGE"];

                        if (
                            userRoleData.roles.some((role) =>
                                judgeRoles.includes(role)
                            )
                        ) {
                            router.push("/grace");
                        }

                        if (
                            userRoleData.roles.some((role) =>
                                adminRoles.includes(role)
                            )
                        ) {
                            router.push("/admin");
                        }

                        // Set all user roles
                        setUserRoles(userRoleData.roles || []);
                    } catch (roleError) {
                        console.error("Error fetching user roles:", roleError);
                    }
                } else {
                    setDashboardStatus("unauthenticated");
                    router.push("/login");
                }
            } catch (error) {
                console.error("Authentication error:", error);

                try {
                    await supabase.auth.signOut();
                } catch (signOutError) {
                    console.error(
                        "Error during forced sign out:",
                        signOutError
                    );
                }

                setDashboardStatus("unauthenticated");
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        if (isClient) {
            checkAuth();
        }
    }, [isClient, router]);

    const handleSignOut = async () => {
        try {
            if (USE_DEMO_DATA) {
                router.push("/");
                return;
            }
            await supabase.auth.signOut();
            setDashboardStatus("unauthenticated");
            router.push("/login");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-16 h-16 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (dashboardStatus === "unauthenticated") {
        return null; // Router will handle the redirect to login
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardNavBar
                user={user}
                onSignOut={handleSignOut}
                userRoles={userRoles}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
