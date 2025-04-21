"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getAllApplications } from "@/core/apply/api/apply";
import { getStats } from "@/core/user/api/user";
import {
    ApplicationStatus,
    ApplicationSummaryDto,
} from "@/core/apply/types/apply.dto";
import SchoolsPieChart from "@/app/components/SchoolsPieChart";
import DemographicsSummary from "@/app/components/DemographicsSummary";
import ApplicationsTimelineChart from "@/app/components/ApplicationsTimelineChart";

interface DashboardStats {
    totalUsers: number;
    totalApplications: number;
    pendingApplications: number;
    approvedApplications: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalApplications: 0,
        pendingApplications: 0,
        approvedApplications: 0,
    });
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState<ApplicationSummaryDto[]>(
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch all data in parallel
                const [userStats, allApps] = await Promise.all([
                    getStats(),
                    getAllApplications(1, 1000),
                ]);

                // Set applications data
                setApplications(allApps.applications);

                // Count applications by status
                const pendingCount = allApps.applications.filter(
                    (app) => app.status === ApplicationStatus.PENDING
                ).length;

                const approvedCount = allApps.applications.filter(
                    (app) => app.status === ApplicationStatus.APPROVED
                ).length;

                // Set stats
                setStats({
                    totalUsers: userStats.totalUsers || 0,
                    totalApplications: allApps.total,
                    pendingApplications: pendingCount,
                    approvedApplications: approvedCount,
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut",
            },
        }),
    };

    const buttonVariants = {
        hover: {
            scale: 1.03,
            boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.97 },
    };

    return (
        <div className="py-6">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <motion.div
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[rgb(var(--mesa-warm-red))]"
                        >
                            <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                                Total Users
                            </h2>
                            <p className="text-3xl font-bold text-[rgb(var(--mesa-grey))]">
                                {stats.totalUsers}
                            </p>
                        </motion.div>

                        <motion.div
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[rgb(var(--mesa-orange))]"
                        >
                            <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                                Total Applications
                            </h2>
                            <p className="text-3xl font-bold text-[rgb(var(--mesa-grey))]">
                                {stats.totalApplications}
                            </p>
                        </motion.div>

                        <motion.div
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[rgb(var(--mesa-yellow-116))]"
                        >
                            <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                                Pending Applications
                            </h2>
                            <p className="text-3xl font-bold text-[rgb(var(--mesa-grey))]">
                                {stats.pendingApplications}
                            </p>
                        </motion.div>

                        <motion.div
                            custom={3}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[rgb(var(--mesa-green))]"
                        >
                            <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                                Approved Applications
                            </h2>
                            <p className="text-3xl font-bold text-[rgb(var(--mesa-grey))]">
                                {stats.approvedApplications}
                            </p>
                        </motion.div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Schools Pie Chart */}
                        <motion.div
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                        >
                            <SchoolsPieChart applications={applications} />
                        </motion.div>
                        {/* Applications Timeline Chart */}
                        <motion.div
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                        >
                            <ApplicationsTimelineChart
                                applications={applications}
                            />
                        </motion.div>
                    </div>

                    {/* Demographics Summary */}
                    <DemographicsSummary applications={applications} />

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="bg-white p-6 rounded-lg shadow-md mb-8"
                    >
                        <h2 className="text-xl font-bold text-[rgb(var(--mesa-grey))] mb-4">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href="/admin/applications">
                                <motion.div
                                    whileHover="hover"
                                    whileTap="tap"
                                    variants={buttonVariants}
                                    className="flex items-center justify-center p-4 bg-[rgb(var(--mesa-yellow-107))] bg-opacity-20 rounded-lg cursor-pointer"
                                >
                                    <span className="font-medium">
                                        Review Applications
                                    </span>
                                </motion.div>
                            </Link>

                            <Link href="/admin/users">
                                <motion.div
                                    whileHover="hover"
                                    whileTap="tap"
                                    variants={buttonVariants}
                                    className="flex items-center justify-center p-4 bg-[rgb(var(--mesa-orange))] bg-opacity-20 rounded-lg cursor-pointer"
                                >
                                    <span className="font-medium">
                                        Manage Users
                                    </span>
                                </motion.div>
                            </Link>

                            <Link href="/admin/settings">
                                <motion.div
                                    whileHover="hover"
                                    whileTap="tap"
                                    variants={buttonVariants}
                                    className="flex items-center justify-center p-4 bg-[rgb(var(--mesa-purple))] bg-opacity-20 rounded-lg cursor-pointer"
                                >
                                    <span className="font-medium">
                                        System Settings
                                    </span>
                                </motion.div>
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
}
