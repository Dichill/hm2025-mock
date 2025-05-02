"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getAuthData, logout } from "@/api/grace-client";
import { AuthResponse } from "@/core/grace/types/judge.dto";

/**
 * Judge Dashboard Component
 * Shows judge information and provides access to judging features
 */
export default function JudgeDashboard() {
    const router = useRouter();
    const [authData, setAuthData] = useState<AuthResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Check authentication status on component mount
    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/grace");
            return;
        }

        const data = getAuthData();
        setAuthData(data);
        setLoading(false);
    }, [router]);

    /**
     * Handles judge logout
     */
    const handleLogout = () => {
        logout();
        router.push("/grace");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with logout button */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">
                        Judge Dashboard
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Judge Information
                        </h2>
                        <div className="mt-4 space-y-2">
                            <div className="flex">
                                <span className="font-medium w-32">
                                    User ID:
                                </span>
                                <span>{authData?.userId || "N/A"}</span>
                            </div>
                            <div className="flex">
                                <span className="font-medium w-32">Type:</span>
                                <span>{authData?.type || "N/A"}</span>
                            </div>
                            {authData?.sponsorTag && (
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Sponsor:
                                    </span>
                                    <span>{authData.sponsorTag}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-blue-50 rounded-lg p-6 shadow-sm flex flex-col items-center justify-center text-center">
                            <h3 className="text-lg font-medium text-blue-900 mb-2">
                                Review Projects
                            </h3>
                            <p className="text-blue-700 mb-4">
                                Score and provide feedback for hackathon
                                projects
                            </p>
                            <button
                                onClick={() => router.push("/grace/projects")}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                View Projects
                            </button>
                        </div>

                        <div className="bg-green-50 rounded-lg p-6 shadow-sm flex flex-col items-center justify-center text-center">
                            <h3 className="text-lg font-medium text-green-900 mb-2">
                                My Scores
                            </h3>
                            <p className="text-green-700 mb-4">
                                View and manage your submitted scores
                            </p>
                            <button
                                onClick={() => router.push("/grace/scores")}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                            >
                                View Scores
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
