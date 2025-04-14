"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import supabase from "@/lib/supabase/supabase-client";
import { ApplicationForm } from "./components/ApplicationForm";
export default function ApplicationPage() {
    const [isClient, setIsClient] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);

        // Check if user is already logged in
        const checkSession = async () => {
            try {
                const { data } = await supabase.auth.getSession();

                if (!data.session) {
                    // User is not logged in, redirect to login
                    router.push("/login");
                    return;
                }

                // Check if user has already completed the application
                // This could be a fetch to your API or Supabase
                /* 
                const { data: applicationData, error } = await supabase
                    .from("applications")
                    .select("*")
                    .eq("user_id", data.session.user.id)
                    .single();

                if (applicationData) {
                    // User already has an application, redirect to dashboard
                    router.push("/dashboard");
                }
                */
            } catch (error) {
                console.error("Error checking session:", error);
            } finally {
                setIsCheckingAuth(false);
            }
        };

        checkSession();
    }, [router]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
                duration: 0.5,
            },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                type: "spring",
                stiffness: 100,
            },
        },
    };

    // Show loading spinner while checking authentication
    if (isCheckingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <motion.div
            className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-5xl mx-auto">
                <motion.div
                    className="text-center mb-8"
                    variants={titleVariants}
                >
                    <h1 className="text-4xl font-bold text-[rgb(var(--mesa-warm-red))]">
                        HACKMESA 2025
                    </h1>
                    <p className="mt-2 text-lg text-[rgb(var(--mesa-grey))]">
                        Apply to attend our first-ever hackathon hosted by the
                        MESA program across LACCD.
                    </p>
                </motion.div>

                {isClient && <ApplicationForm />}
            </div>
        </motion.div>
    );
}
