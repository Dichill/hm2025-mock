"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ApplicationPage() {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleBackClick = () => {
        router.push("/dashboard");
    };

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

    const buttonVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: 0.2,
            },
        },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 300,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-5xl mx-auto">
                <motion.div
                    className="mb-6 flex justify-start"
                    variants={buttonVariants}
                >
                    <button
                        onClick={handleBackClick}
                        className="flex items-center px-4 py-2 text-sm font-medium text-[rgb(var(--mesa-warm-red))] bg-white border border-[rgb(var(--mesa-warm-red))] rounded-md hover:bg-[rgba(var(--mesa-warm-red),0.05)] transition-colors cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Dashboard
                    </button>
                </motion.div>

                <motion.div
                    className="text-center mb-8"
                    variants={titleVariants}
                >
                    <h1 className="text-4xl font-bold text-[rgb(var(--mesa-warm-red))]">
                        HACKMESA 2025
                    </h1>
                    <p className="mt-2 text-lg text-[rgb(var(--mesa-grey))]">
                        Registration is now closed
                    </p>
                </motion.div>

                {isClient && (
                    <motion.div
                        className="bg-white rounded-lg p-8 shadow-lg text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-semibold text-[rgb(var(--mesa-warm-red))] mb-4">
                            Registration Period Has Ended
                        </h2>
                        <p className="text-[rgb(var(--mesa-grey))] mb-6">
                            Thank you for your interest in HACKMESA 2025. The
                            registration period has ended. We look forward to
                            seeing you at future events!
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
