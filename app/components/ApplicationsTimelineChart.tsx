"use client";

import React, { useMemo } from "react";
import {
    ApplicationStatus,
    ApplicationSummaryDto,
} from "@/core/apply/types/apply.dto";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

interface ApplicationsTimelineChartProps {
    applications: ApplicationSummaryDto[];
}

interface ChartDataPoint {
    date: string;
    PENDING: number;
    APPROVED: number;
    REJECTED: number;
    WAITLISTED: number;
    SAVED: number;
}

export default function ApplicationsTimelineChart({
    applications,
}: ApplicationsTimelineChartProps) {
    const chartData = useMemo(() => {
        if (!applications || applications.length === 0) {
            return [];
        }

        const dateMap = new Map<string, ChartDataPoint>();

        applications.forEach((app) => {
            const date = new Date(app.updated_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });

            if (!dateMap.has(date)) {
                dateMap.set(date, {
                    date,
                    PENDING: 0,
                    APPROVED: 0,
                    REJECTED: 0,
                    WAITLISTED: 0,
                    SAVED: 0,
                });
            }

            const dataPoint = dateMap.get(date)!;
            dataPoint[app.status]++;
        });

        const sortedDates = Array.from(dateMap.entries())
            .sort((a, b) => {
                const dateA = new Date(a[0]);
                const dateB = new Date(b[0]);
                return dateA.getTime() - dateB.getTime();
            })
            .map(([_, dataPoint]) => dataPoint);

        return sortedDates;
    }, [applications]);

    const statusColors = {
        PENDING: "rgb(var(--mesa-yellow-116))",
        APPROVED: "rgb(var(--mesa-green))",
        REJECTED: "rgb(var(--mesa-warm-red))",
        WAITLISTED: "rgb(var(--mesa-purple))",
        SAVED: "rgb(var(--mesa-grey))",
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[rgb(var(--mesa-grey))] mb-4">
                Applications Timeline
            </h2>
            <div className="h-80">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="PENDING"
                                stroke={statusColors.PENDING}
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="APPROVED"
                                stroke={statusColors.APPROVED}
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="REJECTED"
                                stroke={statusColors.REJECTED}
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="WAITLISTED"
                                stroke={statusColors.WAITLISTED}
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="SAVED"
                                stroke={statusColors.SAVED}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">
                            No application data available
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
