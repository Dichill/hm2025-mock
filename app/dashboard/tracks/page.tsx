"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { tracks, sponsorChallenges } from "@/lib/tracks-data";

/**
 * TracksPage component that displays main quests and sponsor challenges
 * for the hackathon
 */
export default function TracksPage() {
    const [isClient, setIsClient] = useState(false);

    // Animation variants for container elements
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

    // Animation variants for individual card elements
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
        <div className="space-y-10 pb-8">
            {/* Page Header */}
            <div className="border-b pb-5 mb-8">
                <h1 className="text-3xl font-bold">HACKMESA 2025 Tracks</h1>

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-wrap gap-4 mt-3 mb-4"
                >
                    <div className="bg-gradient-to-r from-[rgb(var(--mesa-orange))] to-[rgb(var(--mesa-rhodamine))] text-white px-4 py-2 rounded-lg shadow-md">
                        <span className="font-bold">1st Place:</span> $1,500
                    </div>
                    <div className="bg-gradient-to-r from-[rgb(var(--mesa-purple))] to-[rgb(var(--mesa-rhodamine))] text-white px-4 py-2 rounded-lg shadow-md">
                        <span className="font-bold">2nd Place:</span> $1,000
                    </div>
                    <div className="bg-gradient-to-r from-[rgb(var(--mesa-green))] to-[rgb(var(--mesa-yellow-116))] text-white px-4 py-2 rounded-lg shadow-md">
                        <span className="font-bold">3rd Place:</span> $500
                    </div>
                </motion.div>

                <p className="text-gray-600 mt-2">
                    Choose from our main quest tracks or take on sponsor
                    challenges to win prizes!
                </p>
                <p className="text-gray-600 mt-2">
                    You can combine sponsor challenges with main quest tracks to
                    maximize your chances of winning. Feel free to participate
                    in multiple challenges simultaneously!
                </p>
            </div>

            {/* Main Quest Tracks Section */}
            <section>
                <div className="flex items-center mb-6">
                    <div className="w-1.5 h-6 bg-[rgb(var(--mesa-purple))] rounded-full mr-3"></div>
                    <h2 className="text-2xl font-semibold">
                        Main Quest Tracks
                    </h2>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {tracks.map((track) => (
                        <motion.div
                            key={track.id}
                            variants={cardVariants}
                            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col h-full"
                        >
                            <div className="flex items-center mb-4">
                                <div
                                    className={`w-12 h-12 bg-[rgb(var(--${track.color}))]/20 rounded-full flex items-center justify-center`}
                                >
                                    <div
                                        className={`text-[rgb(var(--${track.color}))]`}
                                    >
                                        {track.icon}
                                    </div>
                                </div>
                                <h3 className="ml-3 text-lg font-medium">
                                    {track.title}
                                </h3>
                            </div>
                            <div className="text-gray-600 mb-5 flex-grow">
                                <p className="font-medium text-black">
                                    {track.description}
                                </p>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 mb-2">
                                        Examples:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                                        {track.examples.map(
                                            (example, index) => (
                                                <li key={index}>{example}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Sponsor Challenges Section */}
            <section className="mt-12">
                <div className="flex items-center mb-6">
                    <div className="w-1.5 h-6 bg-[rgb(var(--mesa-yellow-116))] rounded-full mr-3"></div>
                    <h2 className="text-2xl font-semibold">
                        Sponsor Challenges
                    </h2>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {sponsorChallenges.map((challenge) => (
                        <motion.div
                            key={challenge.id}
                            variants={cardVariants}
                            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col h-full"
                        >
                            <div className="flex items-center mb-4">
                                <div
                                    className={`w-12 h-12 bg-[rgb(var(--${challenge.color}))]/20 rounded-full flex items-center justify-center`}
                                >
                                    {challenge.logo || (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 text-[rgb(var(--${challenge.color}))]`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <span className="text-sm text-gray-500">
                                        {challenge.sponsor}
                                    </span>
                                    <h3 className="text-lg font-medium">
                                        {challenge.title}
                                    </h3>
                                </div>
                            </div>
                            <div className="text-gray-600 mb-5 flex-grow">
                                <p>{challenge.description}</p>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 mb-2">
                                        Prizes:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                                        {challenge.prizes.map(
                                            (prize, index) => (
                                                <li key={index}>{prize}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                            {challenge.sponsor === "Major League Hacking" && (
                                <motion.a
                                    href="https://hack.mlh.io/prizes"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`cursor-pointer w-full py-2 bg-gradient-to-r from-[#FF7A00] to-[#FFA41D] text-white rounded-md font-medium mt-2 block text-center shadow-md hover:shadow-lg transition-all duration-200`}
                                >
                                    Learn More
                                </motion.a>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
}
