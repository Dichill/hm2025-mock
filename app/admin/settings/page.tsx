"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { notifyNonApplicants } from "@/core/user/api/admin";
import { NotifyNonApplicantsResponse } from "@/core/user/types/admin.dto";

export default function AdminSettingsPage(): React.ReactElement {
    const [notificationResult, setNotificationResult] =
        useState<NotifyNonApplicantsResponse | null>(null);
    const [isNotifying, setIsNotifying] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleNotifyNonApplicants = async (): Promise<void> => {
        try {
            setIsNotifying(true);
            setNotificationResult(null);
            setError(null);
            const result = await notifyNonApplicants();
            setNotificationResult(result);
        } catch (err) {
            setError("Failed to send notifications. Please try again later.");
            console.error(err);
        } finally {
            setIsNotifying(false);
        }
    };

    return (
        <div className="py-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[rgb(var(--mesa-warm-red))]">
                    Admin Settings
                </h1>
            </div>

            <div className="grid gap-6">
                {/* Notifications Settings Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Notification Settings
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            Notify Non-Applicants
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Send reminder emails to all students
                                            who have not yet submitted an
                                            application.
                                        </p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleNotifyNonApplicants}
                                        disabled={isNotifying}
                                        className="px-4 py-2 bg-[rgb(var(--mesa-warm-red))] text-white rounded-md disabled:bg-opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isNotifying
                                            ? "Sending..."
                                            : "Send Notifications"}
                                    </motion.button>
                                </div>
                            </div>

                            {/* Notification Status */}
                            {notificationResult && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`p-4 rounded-lg ${
                                        notificationResult.success
                                            ? "bg-green-50 border border-green-200"
                                            : "bg-yellow-50 border border-yellow-200"
                                    }`}
                                >
                                    <div className="flex items-start">
                                        <div
                                            className={`flex-shrink-0 w-5 h-5 mr-3 mt-0.5 ${
                                                notificationResult.success
                                                    ? "text-green-500"
                                                    : "text-yellow-500"
                                            }`}
                                        >
                                            {notificationResult.success ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                {notificationResult.success
                                                    ? `Successfully sent ${notificationResult.notifiedCount} notifications`
                                                    : `Notification partially completed: ${notificationResult.notifiedCount} sent, ${notificationResult.failedCount} failed`}
                                            </p>
                                            {notificationResult.errors &&
                                                notificationResult.errors
                                                    .length > 0 && (
                                                    <div className="mt-2">
                                                        <p className="text-sm font-medium">
                                                            Errors:
                                                        </p>
                                                        <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                                                            {notificationResult.errors.map(
                                                                (
                                                                    err,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {err}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-4 bg-red-50 border border-red-200 rounded-lg"
                                >
                                    <div className="flex">
                                        <div className="flex-shrink-0 w-5 h-5 mr-3 text-red-500">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-red-600">
                                            {error}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
