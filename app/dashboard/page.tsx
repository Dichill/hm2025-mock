"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import supabase from "@/lib/supabase/supabase-client";
import { User, UserProfile, DashboardStatus } from "./types";

export default function DashboardPage() {
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [, setDashboardStatus] = useState<DashboardStatus>("loading");
    const router = useRouter();

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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 25px rgba(255, 137, 62, 0.2)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.97 },
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
            {/* Header with user info */}
            <motion.header
                className="bg-white shadow-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-[rgb(var(--mesa-warm-red))]">
                            HackMESA
                        </h1>
                        <span className="ml-2 text-gray-500">Dashboard</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Welcome,</p>
                            <p className="font-medium">
                                {user?.email ||
                                    userProfile?.full_name ||
                                    "User"}
                            </p>
                        </div>
                        <motion.button
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            onClick={handleSignOut}
                            className="px-4 py-2 bg-[rgb(var(--mesa-warm-red))] text-white rounded-md shadow-sm text-sm font-medium"
                        >
                            Sign Out
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-xl font-semibold mb-4">
                        Your Dashboard
                    </h2>
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                        <p className="text-gray-700">
                            Welcome to your HackMESA dashboard! This is where
                            you can manage your participation and access
                            features.
                        </p>
                    </div>
                </motion.div>

                {/* Dashboard cards grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {/* Profile card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-[rgb(var(--mesa-orange))]/20 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[rgb(var(--mesa-orange))]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="ml-3 text-lg font-medium">
                                Your Profile
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Update your personal information and preferences.
                        </p>
                        <motion.button
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            className="w-full py-2 bg-[rgb(var(--mesa-purple))]/10 text-[rgb(var(--mesa-purple))] rounded-md font-medium mt-2"
                        >
                            View Profile
                        </motion.button>
                    </motion.div>

                    {/* Schedule card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-[rgb(var(--mesa-green))]/20 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[rgb(var(--mesa-green))]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="ml-3 text-lg font-medium">
                                Event Schedule
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            View the hackathon schedule and manage your
                            registrations.
                        </p>
                        <motion.button
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            className="w-full py-2 bg-[rgb(var(--mesa-green))]/10 text-[rgb(var(--mesa-green))] rounded-md font-medium mt-2"
                        >
                            View Schedule
                        </motion.button>
                    </motion.div>

                    {/* Resources card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-[rgb(var(--mesa-yellow-116))]/20 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[rgb(var(--mesa-yellow-116))]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>
                            <h3 className="ml-3 text-lg font-medium">
                                Resources
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Access helpful resources, documentation, and
                            tutorials.
                        </p>
                        <motion.button
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            className="w-full py-2 bg-[rgb(var(--mesa-yellow-116))]/10 text-[rgb(var(--mesa-yellow-116))] rounded-md font-medium mt-2"
                        >
                            View Resources
                        </motion.button>
                    </motion.div>

                    {/* Team card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-[rgb(var(--mesa-rhodamine))]/20 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[rgb(var(--mesa-rhodamine))]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="ml-3 text-lg font-medium">
                                Your Team
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Manage your team members and project submissions.
                        </p>
                        <motion.button
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            className="w-full py-2 bg-[rgb(var(--mesa-rhodamine))]/10 text-[rgb(var(--mesa-rhodamine))] rounded-md font-medium mt-2"
                        >
                            Manage Team
                        </motion.button>
                    </motion.div>

                    {/* Announcements card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-[rgb(var(--mesa-warm-red))]/20 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[rgb(var(--mesa-warm-red))]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                                    />
                                </svg>
                            </div>
                            <h3 className="ml-3 text-lg font-medium">
                                Announcements
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Stay updated with the latest announcements and news.
                        </p>
                        <motion.button
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            className="w-full py-2 bg-[rgb(var(--mesa-warm-red))]/10 text-[rgb(var(--mesa-warm-red))] rounded-md font-medium mt-2"
                        >
                            View Announcements
                        </motion.button>
                    </motion.div>

                    {/* Help card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-[rgb(var(--mesa-grey))]/20 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[rgb(var(--mesa-grey))]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="ml-3 text-lg font-medium">
                                Help & Support
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Get support and answers to your questions.
                        </p>
                        <motion.button
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            className="w-full py-2 bg-[rgb(var(--mesa-grey))]/10 text-[rgb(var(--mesa-grey))] rounded-md font-medium mt-2"
                        >
                            Get Help
                        </motion.button>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}
