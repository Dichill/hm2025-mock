"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Application, ApplicationStatus } from "./types";
import ApplicationStatusCard from "@/app/components/ApplicationStatusCard/ApplicationStatusCard";
import DiscordCard from "@/app/components/DiscordCard/DiscordCard";
import { getCurrentApplication } from "@/core/apply/api/apply";

export default function DashboardPage() {
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);
    const [application, setApplication] = useState<Application | null>(null);
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

    useEffect(() => {
        setIsClient(true);

        const fetchApplicationData = async () => {
            try {
                setLoading(true);

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
            } finally {
                setLoading(false);
            }
        };

        if (isClient) {
            fetchApplicationData();
        }
    }, [isClient]);

    // Handle apply now button click
    const handleApplyNow = () => {
        router.push("/dashboard/apply");
    };

    if (loading) {
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
            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6"
        >
            {/* Application Status Card */}
            <ApplicationStatusCard
                application={application}
                onApplyNow={handleApplyNow}
            />

            {/* Discord Card */}
            <DiscordCard />
        </motion.div>
    );
}
