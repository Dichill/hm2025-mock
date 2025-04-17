"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LoginForm } from "./components/LoginForm";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase/supabase-client";

export default function LoginPage() {
    const [isClient, setIsClient] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);

        // Check if user is already logged in
        const checkSession = async () => {
            try {
                const { data } = await supabase.auth.getSession();

                if (data.session) {
                    // User is already logged in, redirect to dashboard
                    router.push("/dashboard");
                }
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

    const imageVariants = {
        hidden: { opacity: 0, scale: 1.1 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: "easeOut",
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
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
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Background image with overlay and animation */}
            <motion.div
                className="absolute inset-0 z-0"
                variants={imageVariants}
            >
                <Image
                    src="/MESA_student_overlay1.webp"
                    alt="MESA Students"
                    fill
                    className="object-cover"
                    priority
                />
                <motion.div
                    className="absolute inset-0 bg-slate-900/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                ></motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-10 w-full max-w-md p-8 space-y-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-100"
                variants={cardVariants}
            >
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <motion.h1
                        className="text-3xl font-bold text-[rgb(var(--mesa-warm-red))]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.8,
                            type: "spring",
                            stiffness: 200,
                        }}
                    >
                        HACKMESA
                    </motion.h1>
                    <motion.p
                        className="text-[rgb(var(--mesa-grey))] mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        Sign in to your account
                    </motion.p>
                </motion.div>

                {isClient && <LoginForm />}
            </motion.div>
        </motion.div>
    );
}
