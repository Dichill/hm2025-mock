"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import supabase from "@/lib/supabase/supabase-client";
import { User, UserProfile, DashboardStatus, Application } from "./types";
import DashboardNavBar from "@/app/components/DashboardNavBar/DashboardNavBar";
import ApplicationStatusCard from "@/app/components/ApplicationStatusCard/ApplicationStatusCard";

export default function DashboardPage() {
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [, setDashboardStatus] = useState<DashboardStatus>("loading");
    const [application, setApplication] = useState<Application | null>(null);
    const router = useRouter();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    useEffect(() => {
        setIsClient(true);

        const checkAuth = async () => {
            try {
                setLoading(true);
                const { data: sessionData } = await supabase.auth.getSession();

                if (!sessionData.session) {
                    setDashboardStatus("unauthenticated");
                    router.push("/login");
                    return;
                }

                const { data: userData } = await supabase.auth.getUser();
                if (userData.user) {
                    setUser(userData.user as User);
                    setDashboardStatus("authenticated");

                    // Fetch user profile data if needed
                    const { data: profileData } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("user_id", userData.user.id)
                        .single();

                    if (profileData) {
                        setUserProfile(profileData as UserProfile);
                    }

                    try {
                        const { data: applicationData } = await supabase
                            .from("applications")
                            .select("*")
                            .eq("userId", userData.user.id)
                            .single();

                        if (applicationData) {
                            setApplication(applicationData as Application);
                        }
                    } catch (error) {
                        console.error(
                            "Error fetching application data:",
                            error
                        );
                        // For demonstration, you could use this to simulate different states:
                        // Uncomment one of these to test different states

                        // Pending application state
                        /*
                        setApplication({
                            id: "mock-app-id",
                            user_id: userData.user.id,
                            status: "pending",
                            applied_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                        });
                        */

                        // Accepted application state
                        /*
                        setApplication({
                            id: "mock-app-id",
                            user_id: userData.user.id,
                            status: "accepted",
                            applied_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
                            updated_at: new Date().toISOString(),
                            decision_at: new Date().toISOString(),
                        });
                        */

                        // Default - no application
                        setApplication(null);
                    }
                } else {
                    setDashboardStatus("unauthenticated");
                    router.push("/login");
                }
            } catch (error) {
                console.error("Authentication error:", error);
                setDashboardStatus("unauthenticated");
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
            await supabase.auth.signOut();
            setDashboardStatus("unauthenticated");
            router.push("/login");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    // Handle apply now button click
    const handleApplyNow = () => {
        router.push("/dashboard/apply");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-16 h-16 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Use the new DashboardNavBar component */}
            <DashboardNavBar
                user={user}
                userProfile={userProfile}
                onSignOut={handleSignOut}
            />

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6"
                >
                    {/* Application Status Card */}
                    <ApplicationStatusCard
                        application={application}
                        onApplyNow={handleApplyNow}
                    />
                </motion.div>
            </main>
        </div>
    );
}
