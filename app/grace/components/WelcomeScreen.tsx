"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase/supabase-client";

interface WelcomeScreenProps {
    userName: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ userName }) => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
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

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-4 py-8 max-w-4xl"
        >
            <motion.div variants={cardVariants} className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-[rgb(var(--mesa-warm-red))]">
                    Hi {userName}!
                </h1>
                <p className="text-gray-600 mt-2">
                    We appreciate your time and effort for participating in
                    HACKMESA 2025!
                </p>
            </motion.div>

            <motion.div
                variants={cardVariants}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6"
            >
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[rgb(var(--mesa-purple))]/20 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-[rgb(var(--mesa-purple))]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </div>
                    <h2 className="ml-3 text-xl font-semibold">
                        While waiting for judging to start:
                    </h2>
                </div>

                <div className="space-y-4 pl-2">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-[rgb(var(--mesa-yellow-107))]/20 rounded-full flex items-center justify-center mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-[rgb(var(--mesa-yellow-107))]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <p className="text-gray-700 font-medium">
                            Charge your phone!
                        </p>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-[rgb(var(--mesa-green))]/20 rounded-full flex items-center justify-center mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-[rgb(var(--mesa-green))]"
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
                        <p className="text-gray-700 font-medium">
                            Say hi to other judges!
                        </p>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-[rgb(var(--mesa-orange))]/20 rounded-full flex items-center justify-center mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-[rgb(var(--mesa-orange))]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                />
                            </svg>
                        </div>
                        <p className="text-gray-700 font-medium">
                            Grab a snack and water!
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={cardVariants}
                className="bg-[rgb(var(--mesa-warm-red))]/10 border border-[rgb(var(--mesa-warm-red))]/30 rounded-lg p-4 flex items-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[rgb(var(--mesa-warm-red))] mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <div className="flex-grow">
                    <p className="text-[rgb(var(--mesa-warm-red))] font-medium">
                        Have questions? Please ask a{" "}
                        <span className="font-bold">HACKMESA</span> organizer
                        <span className="font-bold">
                            {" "}
                            (Look for the orange t-shirts!)
                        </span>
                    </p>
                </div>
            </motion.div>

            <motion.div variants={cardVariants} className="mt-6 text-center">
                <button
                    onClick={handleSignOut}
                    className="px-6 py-2 bg-[rgb(var(--mesa-warm-red))] hover:bg-[rgb(var(--mesa-warm-red))]/90 text-white font-medium rounded-md transition-colors duration-200 shadow-sm"
                >
                    Sign Out
                </button>
            </motion.div>
        </motion.div>
    );
};

export default WelcomeScreen;
