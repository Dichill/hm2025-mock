"use client";

import React, { useEffect, useState } from "react";
import { ApplicationSummaryDto, School } from "@/core/apply/types/apply.dto";

interface SchoolData {
    school: School;
    count: number;
    color: string;
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

                applications.forEach((app) => {
                    if (app && app.school) {
                        if (Object.values(School).includes(app.school)) {
                            schoolCounts[app.school] =
                                (schoolCounts[app.school] || 0) + 1;
                        }
                    }
                });

                const schoolsArray: SchoolData[] = Object.entries(schoolCounts)
                    .map(([school, count]) => ({
                        school: school as School,
                        count,
                        color: SCHOOL_COLORS[school as School] || "gray",
                    }))
                    .filter((item) => item.count > 0)
                    .sort((a, b) => b.count - a.count);

                setSchoolsData(schoolsArray);

                // Calculate conic gradient
                if (schoolsArray.length > 0) {
                    const total = schoolsArray.reduce(
                        (acc, school) => acc + school.count,
                        0
                    );

                    if (total <= 0) {
                        setConicGradient("");
                        return;
                    }

                    let gradient = "";
                    let currentAngle = 0;

                    schoolsArray.forEach((school, index) => {
                        const startAngle = currentAngle;
                        const percentage = (school.count / total) * 100;
                        const degrees = (percentage / 100) * 360;
                        currentAngle += degrees;

                        const endAngle =
                            index === schoolsArray.length - 1
                                ? 360
                                : currentAngle;

                        gradient += `${school.color} ${startAngle}deg, ${
                            school.color
                        } ${endAngle}deg${
                            index < schoolsArray.length - 1 ? ", " : ""
                        }`;
                    });

                    setConicGradient(gradient);
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
                            Error loading data
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
                                <div className="w-24 h-24 bg-white rounded-full"></div>
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
                                <span>{school.count} applications</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
