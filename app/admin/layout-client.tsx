"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase/supabase-client";
import { User } from "@/app/dashboard/types";
import AdminNavBar from "./components/AdminNavBar";
import { getUserData } from "@/core/user/api/user";
import { UserDataResponse } from "@/core/user/types/user.dto";
import { USE_DEMO_DATA } from "@/core/mock/demo-mode";

/**
 * Client-side layout component for the admin section
 * Handles authentication and admin role verification
 */
export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);

        /**
         * Verifies user authentication and admin privileges
         */
        const checkAuth = async () => {
            try {
                setLoading(true);
                if (USE_DEMO_DATA) {
                    setUser({
                        id: "demo-admin-1",
                        email: "admin@hackmesa.org",
                    } as User);
                    setIsAdmin(true);
                    return;
                }
                const { data: sessionData } = await supabase.auth.getSession();

                if (!sessionData.session) {
                    router.push("/login");
                    return;
                }

                try {
                    const userData: UserDataResponse = await getUserData();

                    if (userData && userData.userId) {
                        setUser({
                            id: userData.userId,
                            email: userData.email,
                        } as User);

                        console.log(userData);

                        if (
                            userData.roles.includes("ORGANIZER") ||
                            userData.roles.includes("SPONSORS")
                        ) {
                            setIsAdmin(true);
                        } else {
                            setIsAdmin(false);
                            router.push("/dashboard");
                            return;
                        }
                    } else {
                        router.push("/login");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    await supabase.auth.signOut();
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
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        if (isClient) {
            checkAuth();
        }
    }, [isClient, router]);

    /**
     * Handles user sign out
     */
    const handleSignOut = async () => {
        try {
            if (USE_DEMO_DATA) {
                router.push("/");
                return;
            }
            await supabase.auth.signOut({ scope: "local" });
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

    if (!isAdmin) {
        return null; // Router will handle the redirect
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavBar user={user} onSignOut={handleSignOut} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
