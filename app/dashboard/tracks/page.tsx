"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Interface defining a track with its details
 */
type Track = {
    id: string;
    title: string;
    description: string;
    examples: string[];
    icon: React.ReactNode;
    color: string;
};

/**
 * Interface defining a sponsor challenge with its details
 */
type SponsorChallenge = {
    id: string;
    sponsor: string;
    title: string;
    description: string;
    prizes: string[];
    color: string;
    logo?: React.ReactNode;
};

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

    // Main quest tracks data
    const tracks: Track[] = [
        {
            id: "accessibility",
            title: "Accessibility",
            description: "Empower every user!",
            examples: [
                "Live-captioning apps",
                "Accessible navigation tools",
                "Inclusive websites",
            ],
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                </svg>
            ),
            color: "mesa-purple",
        },
        {
            id: "artists",
            title: "Artists",
            description: "Build tools that amplify creativity!",
            examples: [
                "AI art generators",
                "Music composition apps",
                "Design platforms",
            ],
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            ),
            color: "mesa-rhodamine",
        },
        {
            id: "athletes",
            title: "Athletes",
            description: "Supercharge athletic performance!",
            examples: [
                "Fitness wearables",
                "Team strategy analyzers",
                "Injury prevention apps",
            ],
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
            ),
            color: "mesa-orange",
        },
        {
            id: "wildcard",
            title: "Original Idea (Wildcard)",
            description: "Got something totally different in mind?",
            examples: [
                "Submit under 'Other' and you'll be considered for Best in Original Idea!",
                "We love out-of-the-box thinking!",
            ],
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                </svg>
            ),
            color: "mesa-green",
        },
    ];

    // Sponsor challenges data
    const sponsorChallenges: SponsorChallenge[] = [
        {
            id: "ec-council",
            sponsor: "EC-Council",
            title: "Capture the Flag",
            description:
                "This 60-minute CTF will take place in a virtualized cyber range and is activated through a code-based system. Participants can choose one challenge, Kernel, Policy, or Careless with access granted for 7 days. See the Events page to register!",
            prizes: ["Certification vouchers", "CTF completion badges"],
            color: "mesa-warm-red",
        },
        {
            id: "holo",
            sponsor: "Hologram Labs",
            title: "Build a UI Interface for an Autonomous Agent",
            description:
                "Your challenge is to build a user-facing application that connects to an autonomous agent via a provided API endpoint. The agent supports HTTP streaming responses and acts as a multiserver MCP client, capable of connecting to any MCP server that exposes tools via SSE transport. Your app should consume the stream, parse the chunks of data in real time, and provide a smooth interface for interacting with the agent. Bonus points for teams that also implement a simple MCP server exposing tools.",
            prizes: [
                "$100 Amazon gift card",
                "$100 in Holo api credits",
                "Hologram t-shirt",
            ],
            color: "mesa-purple",
        },
        {
            id: "mlh-gemini",
            sponsor: "Major League Hacking",
            title: "Best Use of Gemini API",
            description:
                "It's time to push the boundaries of what's possible with AI using Google Gemini. Build AI-powered apps that make your friends say WHOA.",
            prizes: ["Google Swag", "Recognition from MLH"],
            color: "mesa-yellow-116",
        },
        {
            id: "tech-domain",
            sponsor: "Major League Hacking",
            title: "Best .Tech Domain Name",
            description:
                "Make your Team's Achievements timeless: Win a .Tech Domain Name for up to 10 years to Showcase and Expand Your Project.",
            prizes: [
                "Blue Snowball Microphone",
                "Free .Tech Domain Name for up to 10 years",
            ],
            color: "mesa-grey",
        },
        {
            id: "mongodb",
            sponsor: "Major League Hacking",
            title: "Best Use of MongoDB Atlas",
            description:
                "MongoDB Atlas takes the leading modern database and makes it accessible in the cloud! Get started with a $50 credit for students or sign up for the Atlas free forever tier.",
            prizes: [
                "M5GO IoT Starter Kit for you and each member of your team",
            ],
            color: "mesa-green",
        },
    ];

    // Set isClient to true after component mounts
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
