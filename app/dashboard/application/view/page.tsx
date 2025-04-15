"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getCurrentApplication } from "@/core/apply/api/apply";
import {
    ApplicationResponseDto,
    ApplicationStatus,
    ApplicationDto,
} from "@/core/apply/types/apply.dto";

type FullApplicationDto = ApplicationResponseDto &
    ApplicationDto & {
        applied_at?: string;
    };

export default function ViewApplicationPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [applicationData, setApplicationData] =
        useState<FullApplicationDto | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                setIsLoading(true);

                const application = await getCurrentApplication();

                if (!application) {
                    router.push("/dashboard/apply");
                    return;
                }

                if (application.status !== ApplicationStatus.PENDING) {
                    if (application.status === ApplicationStatus.SAVED) {
                        router.push("/dashboard/apply");
                    } else {
                        router.push("/dashboard");
                    }
                    return;
                }

                setApplicationData(application as FullApplicationDto);
            } catch (error) {
                console.error("Error fetching application:", error);
                setError(
                    "An error occurred while fetching your application. Please try again later."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchApplication();
    }, [router]);

    const formatBoolean = (value: boolean | undefined) => {
        if (value === undefined) return "Not provided";
        return value ? "Yes" : "No";
    };

    const formatArray = (arr: string[] | undefined) => {
        if (!arr) return "None";
        if (!Array.isArray(arr)) return String(arr);
        if (arr.length === 0) return "None";
        return arr.join(", ");
    };

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "Not available";

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Invalid date";

        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        }).format(date);
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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 25 },
        },
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <div className="w-12 h-12 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh] p-4">
                <div className="max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-lg w-full">
                    <h2 className="text-xl sm:text-2xl font-bold text-[rgb(var(--mesa-warm-red))] mb-4">
                        Error
                    </h2>
                    <p className="text-gray-700 mb-6">{error}</p>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="w-full px-4 py-2 bg-[rgb(var(--mesa-orange))] text-white rounded-md hover:bg-[rgb(var(--mesa-orange))]/90 transition-colors"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (!applicationData) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh] p-4">
                <div className="max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-lg w-full">
                    <h2 className="text-xl sm:text-2xl font-bold text-[rgb(var(--mesa-warm-red))] mb-4">
                        No Application Found
                    </h2>
                    <p className="text-gray-700 mb-6">
                        We couldn&apos;t find your application. Please create a
                        new one.
                    </p>
                    <button
                        onClick={() => router.push("/dashboard/apply")}
                        className="w-full px-4 py-2 bg-[rgb(var(--mesa-orange))] text-white rounded-md hover:bg-[rgb(var(--mesa-orange))]/90 transition-colors"
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="px-4 sm:px-6 py-6"
        >
            <div className="max-w-5xl mx-auto">
                <motion.div
                    className="text-center mb-6 sm:mb-8"
                    variants={itemVariants}
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                        <span className="inline-flex items-center">
                            <span className="text-gray-600">
                                Application Status:
                            </span>
                            <span className="ml-2 relative">
                                <span className="text-gray-700">
                                    Under Review
                                </span>
                                <motion.span
                                    className="absolute bottom-0 left-0 h-[2px] bg-gray-400"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeOut",
                                    }}
                                />
                            </span>
                        </span>
                    </h1>
                    <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[rgb(var(--mesa-yellow-116))]/20 text-[rgb(var(--mesa-yellow-116))]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Pending Review
                    </div>
                    <p className="mt-2 text-base sm:text-lg text-[rgb(var(--mesa-grey))]">
                        Your application has been submitted and is currently
                        being reviewed by our team.
                    </p>
                    {applicationData.applied_at && (
                        <p className="text-sm text-gray-500 mt-2">
                            Submitted on:{" "}
                            {formatDate(applicationData.applied_at)}
                        </p>
                    )}
                </motion.div>

                <motion.div
                    className="bg-white shadow-xl rounded-lg overflow-hidden p-4 sm:p-6 md:p-8"
                    variants={itemVariants}
                >
                    <div className="grid grid-cols-1 gap-6">
                        {/* Personal Information */}
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold text-[rgb(var(--mesa-warm-red))] mb-3">
                                Personal Information
                            </h2>
                            <div className="border-b border-gray-200 mb-4"></div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Full Name
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900 break-words">
                                            {applicationData.firstName}{" "}
                                            {applicationData.lastName}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Email Address
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900 break-words">
                                            {applicationData.email}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Phone Number
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {applicationData.phoneNumber}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Student Number
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {applicationData.studentNumber}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Age
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {applicationData.age}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Gender
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {applicationData.gender}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Country of Residence
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {applicationData.country}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            T-Shirt Size
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {applicationData.tShirtSize}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            LinkedIn URL
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900 break-words">
                                            {applicationData.linkedInUrl ? (
                                                <a
                                                    href={
                                                        applicationData.linkedInUrl
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {
                                                        applicationData.linkedInUrl
                                                    }
                                                </a>
                                            ) : (
                                                "Not provided"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Education Information */}
                        <div className="mt-6">
                            <h2 className="text-xl sm:text-2xl font-semibold text-[rgb(var(--mesa-warm-red))] mb-3">
                                Education Information
                            </h2>
                            <div className="border-b border-gray-200 mb-4"></div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            School
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900 break-words">
                                            {applicationData.school}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Level of Study
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {applicationData.levelOfStudy}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Field of Study
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900 break-words">
                                            {applicationData.fieldOfStudy}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            First Hackathon?
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {formatBoolean(
                                                applicationData.firstTime
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Skill Level
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {applicationData.skillLevel}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            MESA Student?
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {formatBoolean(
                                                applicationData.isMesaStudent
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills & Interests */}
                        <div className="mt-6">
                            <h2 className="text-xl sm:text-2xl font-semibold text-[rgb(var(--mesa-warm-red))] mb-3">
                                Skills & Interests
                            </h2>
                            <div className="border-b border-gray-200 mb-4"></div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Primary Skills/Interests
                                    </h3>
                                    <p className="mt-1 text-base sm:text-lg text-gray-900 break-words">
                                        {formatArray(
                                            applicationData.primarySkills
                                        )}
                                    </p>
                                </div>

                                {applicationData.otherSkill &&
                                    applicationData.otherSkill.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Other Skills
                                            </h3>
                                            <p className="mt-1 text-base sm:text-lg text-gray-900 break-words">
                                                {formatArray(
                                                    applicationData.otherSkill
                                                )}
                                            </p>
                                        </div>
                                    )}
                            </div>
                        </div>

                        {/* Essay */}
                        <div className="mt-6">
                            <h2 className="text-xl sm:text-2xl font-semibold text-[rgb(var(--mesa-warm-red))] mb-3">
                                Essay Response
                            </h2>
                            <div className="border-b border-gray-200 mb-4"></div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Why do you want to attend our hackathon?
                                </h3>
                                <div className="mt-2 p-3 sm:p-4 bg-gray-50 rounded-lg">
                                    <p className="text-gray-800 whitespace-pre-wrap text-sm sm:text-base">
                                        {applicationData.whyAttend}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="mt-6">
                            <h2 className="text-xl sm:text-2xl font-semibold text-[rgb(var(--mesa-warm-red))] mb-3">
                                Additional Information
                            </h2>
                            <div className="border-b border-gray-200 mb-4"></div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Dietary Restrictions
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900 break-words">
                                            {formatArray(
                                                applicationData.dietaryRestrictions
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            MLH Code of Conduct
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {formatBoolean(
                                                applicationData.mlhCodeOfConduct
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            MLH Privacy Policy
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {formatBoolean(
                                                applicationData.mlhPrivacyPolicy
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            MLH Email Subscription
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {formatBoolean(
                                                applicationData.mlhEmailSubscription
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            MESA Subscription
                                        </h3>
                                        <p className="mt-1 text-base sm:text-lg text-gray-900">
                                            {formatBoolean(
                                                applicationData.mesaSubscription
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Back to Dashboard Button */}
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => router.push("/dashboard")}
                                className="px-6 py-3 bg-[rgb(var(--mesa-orange))] text-white font-medium rounded-md hover:bg-[rgb(var(--mesa-orange))]/90 transition-colors shadow-sm"
                            >
                                Return to Dashboard
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
