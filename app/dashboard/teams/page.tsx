"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TeamsPage(): React.ReactElement {
    const [isClient, setIsClient] = useState(false);

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

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-16 h-16 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6"
        >
            <motion.div
                variants={cardVariants}
                className="bg-white rounded-lg shadow-sm p-8 border border-gray-100"
            >
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-[rgb(var(--mesa-green))]/20 rounded-full flex items-center justify-center mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-[rgb(var(--mesa-green))]"
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
                    <h1 className="text-3xl font-bold mb-4">Team Formation</h1>
                    <p className="text-xl text-gray-600 mb-6 max-w-2xl">
                        Details will be revealed during the Hackathon.
                    </p>
                    <div className="w-24 h-1 bg-[rgb(var(--mesa-green))]/30 rounded-full"></div>
                </div>
            </motion.div>
        </motion.div>
    );
}
