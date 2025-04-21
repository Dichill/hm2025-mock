"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ApplicationSummaryDto } from "@/core/apply/types/apply.dto";

interface DemographicStats {
    totalApplicants: number;
    gender: Record<string, number>;
    fieldOfStudy: Record<string, number>;
    skillLevel: Record<string, number>;
    firstTimeParticipants: number;
    returningParticipants: number;
    averageAge: number;
}

interface DemographicsSummaryProps {
    applications: ApplicationSummaryDto[];
}

export default function DemographicsSummary({
    applications,
}: DemographicsSummaryProps) {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<DemographicStats>({
        totalApplicants: 0,
        gender: {},
        fieldOfStudy: {},
        skillLevel: {},
        firstTimeParticipants: 0,
        returningParticipants: 0,
        averageAge: 0,
    });

    useEffect(() => {
        const processData = () => {
            try {
                setLoading(true);

                // Initialize counters
                const genderCounts: Record<string, number> = {};
                const fieldOfStudyCounts: Record<string, number> = {};
                const skillLevelCounts: Record<string, number> = {};
                let firstTimeCount = 0;
                let returningCount = 0;
                let ageSum = 0;
                let ageCount = 0;

                // Process each detailed application
                applications.forEach((app) => {
                    if (app.gender) {
                        genderCounts[app.gender] =
                            (genderCounts[app.gender] || 0) + 1;
                    }

                    if (app.fieldOfStudy) {
                        fieldOfStudyCounts[app.fieldOfStudy] =
                            (fieldOfStudyCounts[app.fieldOfStudy] || 0) + 1;
                    }

                    if (app.skillLevel) {
                        skillLevelCounts[app.skillLevel] =
                            (skillLevelCounts[app.skillLevel] || 0) + 1;
                    }

                    if (app.firstTime !== undefined) {
                        if (app.firstTime) {
                            firstTimeCount++;
                        } else {
                            returningCount++;
                        }
                    }

                    if (app.age) {
                        const ageNum = parseInt(app.age);
                        if (!isNaN(ageNum)) {
                            ageSum += ageNum;
                            ageCount++;
                        }
                    }
                });

                setStats({
                    totalApplicants: applications.length,
                    gender: genderCounts,
                    fieldOfStudy: fieldOfStudyCounts,
                    skillLevel: skillLevelCounts,
                    firstTimeParticipants: firstTimeCount,
                    returningParticipants: returningCount,
                    averageAge:
                        ageCount > 0 ? Math.round(ageSum / ageCount) : 0,
                });
            } catch (error) {
                console.error("Error processing demographic data:", error);
            } finally {
                setLoading(false);
            }
        };

        processData();
    }, [applications]);

    // Helper to get percentage
    const getPercentage = (value: number, total: number): string => {
        if (total === 0) return "0%";
        return `${Math.round((value / total) * 100)}%`;
    };

    // Sort data for display
    const getSortedData = (
        data: Record<string, number>
    ): { key: string; value: number }[] => {
        return Object.entries(data)
            .map(([key, value]) => ({ key, value }))
            .sort((a, b) => b.value - a.value);
    };

    const renderBarChart = (
        data: { key: string; value: number }[],
        total: number,
        title: string,
        colorClass: string = "bg-[rgb(var(--mesa-orange))]"
    ) => {
        return (
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">{title}</h3>
                {data.map(({ key, value }) => (
                    <div key={key} className="mb-2">
                        <div className="flex justify-between mb-1">
                            <span className="text-sm">{key}</span>
                            <span className="text-sm text-gray-600">
                                {value} ({getPercentage(value, total)})
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`${colorClass} h-2.5 rounded-full`}
                                style={{ width: getPercentage(value, total) }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
            <h2 className="text-xl font-bold text-[rgb(var(--mesa-grey))] mb-4">
                Applicant Demographics
            </h2>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-10 h-10 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Key Stats */}
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h3 className="text-sm text-gray-500 uppercase mb-1">
                                    Average Age
                                </h3>
                                <p className="text-2xl font-bold text-[rgb(var(--mesa-grey))]">
                                    {stats.averageAge || "N/A"}
                                </p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h3 className="text-sm text-gray-500 uppercase mb-1">
                                    First-time Participants
                                </h3>
                                <p className="text-2xl font-bold text-[rgb(var(--mesa-grey))]">
                                    {getPercentage(
                                        stats.firstTimeParticipants,
                                        stats.firstTimeParticipants +
                                            stats.returningParticipants
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Gender Distribution */}
                        {renderBarChart(
                            getSortedData(stats.gender),
                            stats.totalApplicants,
                            "Gender Distribution",
                            "bg-[rgb(var(--mesa-rhodamine))]"
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* Skill Level Distribution */}
                        {renderBarChart(
                            getSortedData(stats.skillLevel),
                            stats.totalApplicants,
                            "Skill Level Distribution",
                            "bg-[rgb(var(--mesa-green))]"
                        )}

                        {/* Field of Study */}
                        <div className="mb-4">
                            <h3 className="text-lg font-medium mb-3">
                                Top Fields of Study
                            </h3>
                            <div className="max-h-40 overflow-y-auto">
                                {getSortedData(stats.fieldOfStudy)
                                    .slice(0, 6)
                                    .map(({ key, value }) => (
                                        <div
                                            key={key}
                                            className="flex justify-between mb-2 pb-2 border-b border-gray-100"
                                        >
                                            <span className="text-sm">
                                                {key}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                {value} (
                                                {getPercentage(
                                                    value,
                                                    stats.totalApplicants
                                                )}
                                                )
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
