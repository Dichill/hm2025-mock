import { motion } from "framer-motion";
import { Application } from "@/app/dashboard/types";
import { ApplicationStatus } from "@/core/apply/types/apply.dto";
import { useRouter } from "next/navigation";

interface ApplicationStatusCardProps {
    application: Application | null;
    onApplyNow: () => void;
    onUnregister?: () => void;
}

export default function ApplicationStatusCard({
    application,
    onApplyNow,
}: // onUnregister,
ApplicationStatusCardProps) {
    const router = useRouter();
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    const status = application?.status || "NOT_APPLIED";

    const mappedStatus =
        typeof status === "string"
            ? status === "NOT_APPLIED"
                ? "NOT_APPLIED"
                : status === "SAVED"
                ? ApplicationStatus.SAVED
                : status === "PENDING"
                ? ApplicationStatus.PENDING
                : status === "APPROVED"
                ? ApplicationStatus.APPROVED
                : status === "REJECTED"
                ? ApplicationStatus.REJECTED
                : status === "WAITLISTED"
                ? ApplicationStatus.WAITLISTED
                : "NOT_APPLIED"
            : "NOT_APPLIED";

    const statusConfig = {
        NOT_APPLIED: {
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
        [ApplicationStatus.SAVED]: {
            title: "Application Saved",
            description:
                "You've started an application but haven't submitted it yet. Continue where you left off.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                </svg>
            ),
            bgColor: "bg-blue-100",
            buttonText: "Continue Application",
            buttonColor: "bg-blue-50 text-blue-500",
            action: onApplyNow,
        },
        [ApplicationStatus.PENDING]: {
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
            action: () =>
                (window.location.href = "/dashboard/application/view"),
        },
        [ApplicationStatus.APPROVED]: {
            title: "Application Accepted!",
            description:
                "Congratulations! You are among the selected participants for our first-ever HACKMESA event!",
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
            buttonText: "View QR Code",
            buttonColor:
                "bg-[rgb(var(--mesa-green))]/10 text-[rgb(var(--mesa-green))]",
            action: () => router.push("/dashboard/attendance"),
        },
        [ApplicationStatus.REJECTED]: {
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
            buttonText: "",
            buttonColor: "",
            action: () => {},
        },
        [ApplicationStatus.WAITLISTED]: {
            title: "You're on the Waitlist",
            description:
                "Your application has been waitlisted. We'll notify you if a spot becomes available.",
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
            buttonText: "",
            buttonColor: "",
            action: () => {},
        },
    };

    const config = statusConfig[mappedStatus as keyof typeof statusConfig];

    const buttonVariants = {
        hover: {
            scale: 1.03,
            boxShadow:
                mappedStatus === "NOT_APPLIED"
                    ? "0 10px 25px rgba(255, 137, 62, 0.2)"
                    : mappedStatus === ApplicationStatus.SAVED
                    ? "0 10px 25px rgba(59, 130, 246, 0.2)"
                    : mappedStatus === ApplicationStatus.PENDING
                    ? "0 10px 25px rgba(246, 190, 0, 0.2)"
                    : mappedStatus === ApplicationStatus.APPROVED
                    ? "0 10px 25px rgba(76, 175, 80, 0.2)"
                    : mappedStatus === ApplicationStatus.REJECTED
                    ? "0 10px 25px rgba(128, 128, 128, 0.2)"
                    : mappedStatus === ApplicationStatus.WAITLISTED
                    ? "0 10px 25px rgba(246, 190, 0, 0.2)"
                    : "0 10px 25px rgba(128, 128, 128, 0.2)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.97 },
    };

    // Define unregister button variants with matching red shadow
    // const unregisterButtonVariants = {
    //     hover: {
    //         scale: 1.03,
    //         boxShadow: "0 10px 25px rgba(239, 68, 68, 0.2)", // Red shadow
    //         transition: {
    //             type: "spring",
    //             stiffness: 400,
    //             damping: 10,
    //         },
    //     },
    //     tap: { scale: 0.97 },
    // };

    const renderApplicationDate = () => {
        if (!application) return null;

        const formatDate = (dateString: string) => {
            if (!dateString) {
                return "N/A";
            }

            const date = new Date(dateString);

            if (isNaN(date.getTime())) {
                return "Invalid date";
            }

            return new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            }).format(date);
        };

        return (
            <p className="text-xs text-gray-500 mt-2">
                {status === "SAVED" &&
                    `Last saved on: ${formatDate(application.updated_at)}`}
                {status === "PENDING" &&
                    application.applied_at &&
                    `Applied on: ${formatDate(application.applied_at)}`}
                {status === "APPROVED" &&
                    `Accepted on: ${formatDate(
                        application.decision_at || application.updated_at
                    )}`}
                {status === "REJECTED" &&
                    `Updated on: ${formatDate(
                        application.decision_at || application.updated_at
                    )}`}
                {status === "WAITLISTED" &&
                    `Waitlisted on: ${formatDate(
                        application.decision_at || application.updated_at
                    )}`}
            </p>
        );
    };

    // Determine if we can show the unregister button
    // const showUnregisterButton =
    //     onUnregister &&
    //     (mappedStatus === ApplicationStatus.PENDING ||
    //         mappedStatus === ApplicationStatus.APPROVED);

    return (
        <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col h-full"
        >
            <div className="flex items-center mb-4">
                <div
                    className={`w-12 h-12 ${config.bgColor} rounded-full flex items-center justify-center`}
                >
                    {config.icon}
                </div>
                <h3 className="ml-3 text-lg font-medium">{config.title}</h3>
            </div>
            <div className="text-gray-600 mb-4 flex-grow">
                <p>{config.description}</p>

                {renderApplicationDate()}
            </div>

            <div className="flex flex-col space-y-2">
                {config.buttonText && (
                    <motion.button
                        onClick={config.action}
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                        className={`cursor-pointer w-full py-2 ${config.buttonColor} rounded-md font-medium block text-center`}
                    >
                        {config.buttonText}
                    </motion.button>
                )}

                {/* {showUnregisterButton && (
                    <motion.button
                        onClick={onUnregister}
                        whileHover="hover"
                        whileTap="tap"
                        variants={unregisterButtonVariants}
                        className="cursor-pointer w-full py-2 bg-red-50 text-red-500 rounded-md font-medium block text-center"
                    >
                        Unregister from Hackathon
                    </motion.button>
                )} */}
            </div>
        </motion.div>
    );
}
