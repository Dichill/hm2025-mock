"use client";

import React, { useEffect, useState } from "react";
import { ApplicationSummaryDto, School } from "@/core/apply/types/apply.dto";

interface SchoolData {
    school: School;
    count: number;
    color: string;
    percentage: number;
}

interface SchoolsPieChartProps {
    applications: ApplicationSummaryDto[];
}

const SCHOOL_COLORS: Record<School, string> = {
    [School.EAST_LA_COLLEGE]: "rgb(var(--mesa-warm-red))",
    [School.LA_CITY_COLLEGE]: "rgb(var(--mesa-orange))",
    [School.LA_HARBOR_COLLEGE]: "rgb(var(--mesa-yellow-116))",
    [School.LA_MISSION_COLLEGE]: "rgb(var(--mesa-yellow-107))",
    [School.LA_PIERCE_COLLEGE]: "rgb(var(--mesa-green))",
    [School.LA_SOUTHWEST_COLLEGE]: "rgb(var(--mesa-purple))",
    [School.LA_TRADE_TECH_COLLEGE]: "rgb(var(--mesa-rhodamine))",
    [School.LA_VALLEY_COLLEGE]: "rgb(var(--mesa-grey))",
    [School.WEST_LA_COLLEGE]: "rgba(var(--mesa-grey), 0.6)",
};

export default function SchoolsPieChart({
    applications,
}: SchoolsPieChartProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [schoolsData, setSchoolsData] = useState<SchoolData[]>([]);
    const [conicGradient, setConicGradient] = useState<string>("");
    const [totalApplications, setTotalApplications] = useState<number>(0);

    useEffect(() => {
        const processData = () => {
            try {
                setLoading(true);
                setError(null);

                // Validate applications input
                if (!applications || !Array.isArray(applications)) {
                    setSchoolsData([]);
                    setConicGradient("");
                    setError("Invalid applications data");
                    return;
                }

                // Count applications by school
                const schoolCounts: Record<School, number> = Object.values(
                    School
                ).reduce((acc, school) => {
                    acc[school] = 0;
                    return acc;
                }, {} as Record<School, number>);

                // Count applications by school
                applications.forEach((app) => {
                    if (app && app.school) {
                        if (Object.values(School).includes(app.school)) {
                            schoolCounts[app.school] =
                                (schoolCounts[app.school] || 0) + 1;
                        }
                    }
                });

                // Calculate total applications
                const total = Object.values(schoolCounts).reduce(
                    (sum, count) => sum + count,
                    0
                );

                setTotalApplications(total);

                if (total <= 0) {
                    setSchoolsData([]);
                    setConicGradient("");
                    return;
                }

                // Create and sort schools array
                const schoolsArray: SchoolData[] = Object.entries(schoolCounts)
                    .map(([school, count]) => {
                        const percentage = (count / total) * 100;
                        return {
                            school: school as School,
                            count,
                            color: SCHOOL_COLORS[school as School] || "gray",
                            percentage,
                        };
                    })
                    .filter((item) => item.count > 0)
                    .sort((a, b) => b.count - a.count);

                setSchoolsData(schoolsArray);

                // Generate conic gradient
                if (schoolsArray.length > 0) {
                    try {
                        let gradient = "";
                        let currentAngle = 0;

                        for (let i = 0; i < schoolsArray.length; i++) {
                            const school = schoolsArray[i];
                            const startAngle = currentAngle;
                            const degrees = (school.percentage / 100) * 360;

                            // Ensure we have valid degrees value
                            const safeEndAngle =
                                i === schoolsArray.length - 1
                                    ? 360
                                    : currentAngle + Math.max(0.1, degrees);

                            currentAngle = safeEndAngle;

                            gradient += `${school.color} ${startAngle.toFixed(
                                1
                            )}deg, ${school.color} ${safeEndAngle.toFixed(
                                1
                            )}deg${i < schoolsArray.length - 1 ? ", " : ""}`;
                        }

                        setConicGradient(gradient);
                    } catch (gradientError) {
                        console.error(
                            "Error generating gradient:",
                            gradientError
                        );
                        // Fallback to a simple gradient with fewer segments
                        const simplifiedGradient =
                            generateSimplifiedGradient(schoolsArray);
                        setConicGradient(simplifiedGradient);
                    }
                } else {
                    setConicGradient("");
                }
            } catch (error) {
                console.error("Error processing schools data:", error);
                setError("Error processing data");
                setSchoolsData([]);
                setConicGradient("");
            } finally {
                setLoading(false);
            }
        };

        processData();
    }, [applications]);

    // Fallback gradient generator for when there are too many schools or precision issues
    const generateSimplifiedGradient = (schools: SchoolData[]): string => {
        // If we have too many schools, simplify by taking top 5
        const topSchools = schools.length > 5 ? schools.slice(0, 5) : schools;

        let gradient = "";
        let currentAngle = 0;
        let remainingPercentage = 100;

        // For the top schools, calculate exact angles
        for (let i = 0; i < topSchools.length; i++) {
            const school = topSchools[i];
            const startAngle = currentAngle;

            // Last school gets remainder to ensure we reach 360 degrees
            const percentage =
                i === topSchools.length - 1
                    ? remainingPercentage
                    : school.percentage;

            remainingPercentage -= percentage;
            const degrees = (percentage / 100) * 360;
            currentAngle += degrees;

            gradient += `${school.color} ${startAngle.toFixed(1)}deg, ${
                school.color
            } ${currentAngle.toFixed(1)}deg${
                i < topSchools.length - 1 ? ", " : ""
            }`;
        }

        return gradient;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[rgb(var(--mesa-grey))] mb-4">
                Applications by School
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-6 h-80">
                {/* Pie Chart */}
                <div className="relative w-64 h-64">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <div className="absolute inset-0 flex items-center justify-center text-center text-gray-500">
                            {error}
                        </div>
                    ) : schoolsData.length === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center text-center text-gray-500">
                            No application data available
                        </div>
                    ) : (
                        <div
                            className="w-full h-full rounded-full shadow-inner"
                            style={{
                                background: conicGradient
                                    ? `conic-gradient(${conicGradient})`
                                    : "#f5f5f5",
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-sm font-semibold">
                                        {totalApplications}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="flex flex-col flex-wrap max-h-64 overflow-auto">
                    {schoolsData.map((school) => (
                        <div
                            key={school.school}
                            className="flex items-center mb-2 mr-4"
                        >
                            <div
                                className="w-4 h-4 rounded-sm mr-2"
                                style={{ backgroundColor: school.color }}
                            ></div>
                            <div className="text-sm">
                                <span className="font-medium">
                                    {school.school}:{" "}
                                </span>
                                <span>
                                    {school.count} (
                                    {school.percentage.toFixed(1)}%)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
