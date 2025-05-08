"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Application, ApplicationStatus } from "./types";
import ApplicationStatusCard from "@/app/components/ApplicationStatusCard/ApplicationStatusCard";
import DiscordCard from "@/app/components/DiscordCard/DiscordCard";
import {
    getCurrentApplication,
    unregisterFromHackathon,
} from "@/core/apply/api/apply";
import { getUserData } from "@/core/user/api/user";
import { publicSettingsApi } from "@/core/grace/api/settings";

export default function DashboardPage() {
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);
    const [unregistering, setUnregistering] = useState(false);
    const [application, setApplication] = useState<Application | null>(null);
    const [userRoles, setUserRoles] = useState<string[]>([]);
    const [hackathonStarted, setHackathonStarted] = useState(false);
    const router = useRouter();

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

    const buttonVariants = {
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 25px rgba(var(--mesa-orange), 0.2)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.97 },
    };

    useEffect(() => {
        setIsClient(true);

        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch application data
                try {
                    const applicationData = await getCurrentApplication();

                    if (applicationData) {
                        const mappedStatus: ApplicationStatus =
                            applicationData.status;

                        setApplication({
                            id: applicationData.id,
                            user_id: applicationData.userId,
                            status: mappedStatus,
                            created_at: applicationData.created_at,
                            updated_at: applicationData.updated_at,
                        });
                    } else {
                        setApplication(null);
                    }
                } catch (error) {
                    console.error("Error fetching application data:", error);
                    setApplication(null);
                }

                // Fetch user roles
                try {
                    const userData = await getUserData();
                    setUserRoles(userData.roles || []);
                } catch (error) {
                    console.error("Error fetching user roles:", error);
                    setUserRoles([]);
                }

                // Fetch hackathon_started setting
                try {
                    const setting = await publicSettingsApi.getByName(
                        "hackathon_started"
                    );
                    // Check if the value contains a boolean or string representation of 'true'
                    const settingValue =
                        typeof setting.value === "object" &&
                        setting.value !== null
                            ? setting.value.enabled
                            : setting.value;
                    setHackathonStarted(
                        settingValue === true || settingValue === "true"
                    );
                } catch (error) {
                    console.error(
                        "Error fetching hackathon_started setting:",
                        error
                    );
                    setHackathonStarted(false);
                }
            } finally {
                setLoading(false);
            }
        };

        if (isClient) {
            fetchData();
        }
    }, [isClient]);

    // Handle apply now button click
    const handleApplyNow = () => {
        router.push("/dashboard/apply");
    };

    // Handle unregister button click
    const handleUnregister = async () => {
        if (
            window.confirm(
                "Are you sure you want to unregister from HackMESA? This action cannot be undone."
            )
        ) {
            try {
                setUnregistering(true);
                await unregisterFromHackathon();

                // Update application status to reflect changes
                setApplication((prev) =>
                    prev
                        ? {
                              ...prev,
                              status: "REJECTED" as ApplicationStatus,
                          }
                        : null
                );

                // Remove HACKER role
                setUserRoles((prev) =>
                    prev.filter((role) => role !== "HACKER")
                );

                alert("You have successfully unregistered from HackMESA 2025.");
            } catch (error) {
                console.error("Failed to unregister:", error);
                alert("Failed to unregister. Please try again later.");
            } finally {
                setUnregistering(false);
            }
        }
    };

    const isHacker = userRoles.includes("HACKER");

    if (loading || unregistering) {
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
            className={`grid grid-cols-1 ${
                isHacker
                    ? "md:grid-cols-2 lg:grid-cols-3"
                    : "md:grid-cols-1 lg:grid-cols-1"
            } gap-6`}
        >
            {/* Hacker Packet Alert - Only shown to users with HACKER role */}
            {isHacker && (
                <div className="md:col-span-2 lg:col-span-3">
                    <motion.div
                        variants={cardVariants}
                        className="bg-[rgb(var(--mesa-blue))]/10 border border-[rgb(var(--mesa-blue))]/30 rounded-lg p-4 flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[rgb(var(--mesa-blue))] mr-3 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <div className="flex-grow">
                            <p className="text-[rgb(var(--mesa-blue))] font-medium">
                                Access the{" "}
                                <a
                                    href="https://docs.google.com/document/d/1a7KOAm6B1cKJa9QXpj4i9IDYc-YBGx5cVnA8a5_MhEs/edit?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-[rgb(var(--mesa-blue))]"
                                >
                                    HACKMESA 2025 Hacker Packet
                                </a>{" "}
                                for all essential guidelines and resources.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Conditional rendering based on hackathon_started setting and isHacker */}
            <div className={isHacker ? "md:col-span-2 lg:col-span-3" : ""}>
                {isHacker && hackathonStarted ? (
                    <motion.div
                        variants={cardVariants}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-[rgb(var(--mesa-blue))]/20 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[rgb(var(--mesa-blue))]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                            </div>
                            <h3 className="ml-3 text-xl font-semibold">
                                Project Submission
                            </h3>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                The hackathon has started! Submit your project
                                and showcase what you&apos;ve built to win
                                prizes and recognition.
                            </p>
                        </div>
                        <motion.button
                            onClick={() => router.push("/dashboard/submit")}
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            className="cursor-pointer w-full py-2 bg-blue-100 text-blue-600 rounded-md font-medium mt-2 block text-center"
                        >
                            Submit Project
                        </motion.button>
                    </motion.div>
                ) : (
                    <ApplicationStatusCard
                        application={application}
                        onApplyNow={handleApplyNow}
                        onUnregister={handleUnregister}
                    />
                )}
            </div>

            {/* Quick Navigation Cards - Only shown to users with HACKER role */}
            {isHacker && (
                <>
                    {/* Events Card */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col h-full"
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
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="ml-3 text-lg font-medium">
                                Upcoming Events
                            </h3>
                        </div>
                        <div className="text-gray-600 mb-4 flex-grow">
                            <p>
                                View and register for upcoming HackMESA
                                workshops, info sessions, and networking events.
                            </p>
                        </div>
                        <motion.button
                            onClick={() => router.push("/dashboard/events")}
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            className="cursor-pointer w-full py-2 bg-[rgb(var(--mesa-yellow-116))]/10 text-[rgb(var(--mesa-yellow-116))] rounded-md font-medium mt-2 block text-center"
                        >
                            View Events
                        </motion.button>
                    </motion.div>

                    {/* Teams Card */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col h-full"
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
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="ml-3 text-lg font-medium">Teams</h3>
                        </div>
                        <div className="text-gray-600 mb-4 flex-grow">
                            <p>
                                Form or join a team for the hackathon. Connect
                                with other participants and collaborate.
                            </p>
                        </div>
                        <motion.button
                            onClick={() => router.push("/dashboard/teams")}
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            className="cursor-pointer w-full py-2 bg-[rgb(var(--mesa-green))]/10 text-[rgb(var(--mesa-green))] rounded-md font-medium mt-2 block text-center"
                        >
                            Manage Teams
                        </motion.button>
                    </motion.div>

                    {/* Profile Card */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col h-full"
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
                        <div className="text-gray-600 mb-4 flex-grow">
                            <p>
                                Update your personal information, skills, and
                                preferences. Manage your hackathon profile.
                            </p>
                        </div>
                        <motion.button
                            onClick={() => router.push("/dashboard/profile")}
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            className="cursor-pointer w-full py-2 bg-[rgb(var(--mesa-orange))]/10 text-[rgb(var(--mesa-orange))] rounded-md font-medium mt-2 block text-center"
                        >
                            Edit Profile
                        </motion.button>
                    </motion.div>

                    {/* Tracks Card */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col h-full md:col-span-2 lg:col-span-3"
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
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>
                            <h3 className="ml-3 text-lg font-medium">
                                Hackathon Tracks
                            </h3>
                        </div>
                        <div className="text-gray-600 mb-4 flex-grow">
                            <p>
                                Explore the available tracks and sponsor
                                challenges for HackMESA 2025. Choose your
                                project direction!
                            </p>
                        </div>
                        <motion.button
                            onClick={() => router.push("/dashboard/tracks")}
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            className="cursor-pointer w-full py-2 bg-[rgb(var(--mesa-purple))]/10 text-[rgb(var(--mesa-purple))] rounded-md font-medium mt-2 block text-center"
                        >
                            View Tracks
                        </motion.button>
                    </motion.div>
                </>
            )}

            {/* Discord Card */}
            <motion.div
                variants={cardVariants}
                className={isHacker ? "md:col-span-2 lg:col-span-3" : ""}
            >
                <DiscordCard />
            </motion.div>
        </motion.div>
    );
}
