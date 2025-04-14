import { motion } from "framer-motion";
import { Application, ApplicationStatus } from "@/app/dashboard/types";

interface ApplicationStatusCardProps {
    application: Application | null;
    onApplyNow: () => void;
}

export default function ApplicationStatusCard({
    application,
    onApplyNow,
}: ApplicationStatusCardProps) {
    // Animation variants for the card
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    // Determine status if application exists
    const status: ApplicationStatus = application?.status || "not_applied";

    // Status-specific configurations
    const statusConfig = {
        not_applied: {
            title: "Apply for HackMESA",
            description:
                "Submit your application to participate in the upcoming HackMESA event.",
            icon: (
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
            bgColor: "bg-[rgb(var(--mesa-orange))]/20",
            buttonText: "Apply Now",
            buttonColor:
                "bg-[rgb(var(--mesa-orange))]/10 text-[rgb(var(--mesa-orange))]",
            action: onApplyNow,
        },
        pending: {
            title: "Application In Review",
            description:
                "Your application has been submitted and is currently being reviewed by our team.",
            icon: (
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
            bgColor: "bg-[rgb(var(--mesa-yellow-116))]/20",
            buttonText: "View Application",
            buttonColor:
                "bg-[rgb(var(--mesa-yellow-116))]/10 text-[rgb(var(--mesa-yellow-116))]",
            action: () => (window.location.href = "/dashboard/application"),
        },
        accepted: {
            title: "Application Accepted!",
            description:
                "Congratulations! Your application has been accepted. We're excited to see you on May 9th!",
            icon: (
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
            bgColor: "bg-[rgb(var(--mesa-green))]/20",
            buttonText: "Confirm Attendance",
            buttonColor:
                "bg-[rgb(var(--mesa-green))]/10 text-[rgb(var(--mesa-green))]",
            action: () => (window.location.href = "/dashboard/confirm"),
        },
        rejected: {
            title: "Application Status",
            description:
                "Thank you for your interest in HackMESA. Unfortunately, we cannot accommodate all applicants at this time.",
            icon: (
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
            bgColor: "bg-[rgb(var(--mesa-grey))]/20",
            buttonText: "View Other Events",
            buttonColor:
                "bg-[rgb(var(--mesa-grey))]/10 text-[rgb(var(--mesa-grey))]",
            action: () => (window.location.href = "/events"),
        },
        waitlisted: {
            title: "You're on the Waitlist",
            description:
                "You've been placed on our waitlist. We'll notify you if a spot becomes available.",
            icon: (
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
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                </svg>
            ),
            bgColor: "bg-[rgb(var(--mesa-purple))]/20",
            buttonText: "Check Status",
            buttonColor:
                "bg-[rgb(var(--mesa-purple))]/10 text-[rgb(var(--mesa-purple))]",
            action: () => (window.location.href = "/dashboard/waitlist"),
        },
    };

    // Get configuration based on status
    const config = statusConfig[status];

    // Create dynamic button variants based on status
    const buttonVariants = {
        hover: {
            scale: 1.03,
            boxShadow:
                status === "not_applied"
                    ? "0 10px 25px rgba(255, 137, 62, 0.2)"
                    : status === "pending"
                    ? "0 10px 25px rgba(246, 190, 0, 0.2)"
                    : status === "accepted"
                    ? "0 10px 25px rgba(76, 175, 80, 0.2)"
                    : status === "rejected"
                    ? "0 10px 25px rgba(128, 128, 128, 0.2)"
                    : "0 10px 25px rgba(156, 39, 176, 0.2)", // waitlisted
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.97 },
    };

    // Render application date if available
    const renderApplicationDate = () => {
        if (!application) return null;

        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }).format(date);
        };

        return (
            <p className="text-xs text-gray-500 mt-2">
                {status === "pending" &&
                    `Applied on: ${formatDate(application.applied_at)}`}
                {status === "accepted" &&
                    `Accepted on: ${formatDate(
                        application.decision_at || application.updated_at
                    )}`}
                {status === "rejected" &&
                    `Updated on: ${formatDate(
                        application.decision_at || application.updated_at
                    )}`}
                {status === "waitlisted" &&
                    `Waitlisted on: ${formatDate(
                        application.decision_at || application.updated_at
                    )}`}
            </p>
        );
    };

    return (
        <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
        >
            <div className="flex items-center mb-4">
                <div
                    className={`w-12 h-12 ${config.bgColor} rounded-full flex items-center justify-center`}
                >
                    {config.icon}
                </div>
                <h3 className="ml-3 text-lg font-medium">{config.title}</h3>
            </div>
            <div className="text-gray-600 mb-4">
                <p>{config.description}</p>
                {renderApplicationDate()}
            </div>
            <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                onClick={config.action}
                className={`w-full py-2 ${config.buttonColor} rounded-md font-medium mt-2`}
            >
                {config.buttonText}
            </motion.button>
        </motion.div>
    );
}
