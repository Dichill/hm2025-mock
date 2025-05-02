"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { notifyNonApplicants } from "@/core/user/api/admin";
import { NotifyNonApplicantsResponse } from "@/core/user/types/admin.dto";
import { adminSettingsApi } from "@/core/grace/api/settings";
import {
    Setting,
    UpdateSettingDto,
    CreateSettingDto,
} from "@/core/grace/types/settings.dto";
import { toast } from "react-hot-toast";

export default function AdminSettingsPage(): React.ReactElement {
    const [notificationResult, setNotificationResult] =
        useState<NotifyNonApplicantsResponse | null>(null);
    const [isNotifying, setIsNotifying] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [settings, setSettings] = useState<Setting[]>([]);
    const [teamFormationEnabled, setTeamFormationEnabled] =
        useState<boolean>(false);
    const [mainJudgingEnabled, setMainJudgingEnabled] =
        useState<boolean>(false);
    const [sponsorJudgingEnabled, setSponsorJudgingEnabled] =
        useState<boolean>(false);
    const [registrationDeadline, setRegistrationDeadline] =
        useState<string>("");
    const [isSaving, setIsSaving] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const loadSettings = async (): Promise<void> => {
            try {
                setIsLoading(true);
                const settingsData = await adminSettingsApi.getAll();
                setSettings(settingsData);

                const teamFormation = settingsData.find(
                    (s) => s.name === "team_formation_enabled"
                );
                if (teamFormation) {
                    setTeamFormationEnabled(!!teamFormation.value.enabled);
                }

                const mainJudging = settingsData.find(
                    (s) => s.name === "main_judging_enabled"
                );
                if (mainJudging) {
                    setMainJudgingEnabled(!!mainJudging.value.enabled);
                }

                const sponsorJudging = settingsData.find(
                    (s) => s.name === "sponsor_judging_enabled"
                );
                if (sponsorJudging) {
                    setSponsorJudgingEnabled(!!sponsorJudging.value.enabled);
                }

                const regDeadline = settingsData.find(
                    (s) => s.name === "registration_deadline"
                );
                if (regDeadline && regDeadline.value.date) {
                    setRegistrationDeadline(regDeadline.value.date as string);
                }
            } catch (err) {
                console.error("Failed to load settings:", err);
                toast.error(
                    "Failed to load settings. Please refresh the page."
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadSettings();
    }, []);

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

    const toggleSetting = async (
        settingName: string,
        value: Record<string, unknown>,
        description?: string
    ): Promise<void> => {
        try {
            setIsSaving((prev) => ({ ...prev, [settingName]: true }));

            // Check if setting exists
            const existingSetting = settings.find(
                (s) => s.name === settingName
            );
            const updateDto: UpdateSettingDto = {
                value,
                ...(description ? { description } : {}),
            };

            if (existingSetting) {
                // Update existing setting
                await adminSettingsApi.update(settingName, updateDto);
            } else {
                // Create new setting
                const createDto: CreateSettingDto = {
                    name: settingName,
                    value,
                    ...(description ? { description } : {}),
                };
                await adminSettingsApi.create(createDto);
            }

            // Update local state
            setSettings((prev) => {
                const updatedSettings = [...prev];
                const index = updatedSettings.findIndex(
                    (s) => s.name === settingName
                );

                if (index !== -1) {
                    updatedSettings[index] = {
                        ...updatedSettings[index],
                        value,
                        ...(description ? { description } : {}),
                    };
                } else {
                    // Add the new setting to the array (this is just for UI consistency until refresh)
                    updatedSettings.push({
                        id: `temp-${Date.now()}`, // Temporary ID until refresh
                        name: settingName,
                        value,
                        description: description || null,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    });
                }

                return updatedSettings;
            });

            toast.success(`${settingName.replace(/_/g, " ")} setting updated`);
        } catch (err) {
            console.error(`Failed to update ${settingName}:`, err);
            toast.error(
                `Failed to update ${settingName.replace(
                    /_/g,
                    " "
                )}. Please try again.`
            );
        } finally {
            setIsSaving((prev) => ({ ...prev, [settingName]: false }));
        }
    };

    const toggleTeamFormation = async (): Promise<void> => {
        const newValue = !teamFormationEnabled;
        setTeamFormationEnabled(newValue);
        await toggleSetting(
            "team_formation_enabled",
            { enabled: newValue },
            "Controls whether team formation is currently enabled"
        );
    };

    const toggleMainJudging = async (): Promise<void> => {
        const newValue = !mainJudgingEnabled;
        setMainJudgingEnabled(newValue);
        await toggleSetting(
            "main_judging_enabled",
            { enabled: newValue },
            "Controls whether main judging is currently enabled"
        );
    };

    const toggleSponsorJudging = async (): Promise<void> => {
        const newValue = !sponsorJudgingEnabled;
        setSponsorJudgingEnabled(newValue);
        await toggleSetting(
            "sponsor_judging_enabled",
            { enabled: newValue },
            "Controls whether sponsor judging is currently enabled"
        );
    };

    const updateRegistrationDeadline = async (
        e: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        const newDate = e.target.value;
        setRegistrationDeadline(newDate);
        await toggleSetting(
            "registration_deadline",
            { date: newDate },
            "Deadline for hackathon registration"
        );
    };

    return (
        <div className="py-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[rgb(var(--mesa-warm-red))]">
                    Admin Settings
                </h1>
                <p className="text-gray-600 mt-2">
                    Configure global settings for the hackathon platform
                </p>
            </div>

            {isLoading ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-gray-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid gap-6">
                    {/* Hackathon Settings Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white shadow-md rounded-lg overflow-hidden"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Hackathon Settings
                            </h2>

                            <div className="space-y-4">
                                {/* Team Formation Toggle */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                Enable Team Formation
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Allow participants to create and
                                                join teams for the hackathon.
                                                When disabled, team formation is
                                                locked.
                                            </p>
                                        </div>
                                        <div className="relative inline-block w-12 align-middle select-none">
                                            <input
                                                type="checkbox"
                                                name="toggle"
                                                id="toggle-team-formation"
                                                className="sr-only peer"
                                                checked={teamFormationEnabled}
                                                onChange={toggleTeamFormation}
                                                disabled={
                                                    isSaving.team_formation_enabled
                                                }
                                            />
                                            <label
                                                htmlFor="toggle-team-formation"
                                                className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-[rgb(var(--mesa-green))] ${
                                                    isSaving.team_formation_enabled
                                                        ? "opacity-50"
                                                        : ""
                                                }`}
                                            >
                                                <span
                                                    className={`absolute inset-y-0 left-0 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
                                                        teamFormationEnabled
                                                            ? "translate-x-6"
                                                            : "translate-x-0"
                                                    }`}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Registration Deadline */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                Registration Deadline
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Set the deadline for hackathon
                                                registration. After this date,
                                                new registrations will be
                                                closed.
                                            </p>
                                        </div>
                                        <div className="w-64">
                                            <input
                                                type="datetime-local"
                                                value={registrationDeadline}
                                                onChange={
                                                    updateRegistrationDeadline
                                                }
                                                disabled={
                                                    isSaving.registration_deadline
                                                }
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Judging Settings Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white shadow-md rounded-lg overflow-hidden"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Judging Settings
                            </h2>

                            <div className="space-y-4">
                                {/* Main Judging Toggle */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                Enable Main Judging
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Allow judges to evaluate
                                                submissions in the main judging
                                                round.
                                            </p>
                                        </div>
                                        <div className="relative inline-block w-12 align-middle select-none">
                                            <input
                                                type="checkbox"
                                                name="toggle"
                                                id="toggle-main-judging"
                                                className="sr-only peer"
                                                checked={mainJudgingEnabled}
                                                onChange={toggleMainJudging}
                                                disabled={
                                                    isSaving.main_judging_enabled
                                                }
                                            />
                                            <label
                                                htmlFor="toggle-main-judging"
                                                className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-[rgb(var(--mesa-green))] ${
                                                    isSaving.main_judging_enabled
                                                        ? "opacity-50"
                                                        : ""
                                                }`}
                                            >
                                                <span
                                                    className={`absolute inset-y-0 left-0 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
                                                        mainJudgingEnabled
                                                            ? "translate-x-6"
                                                            : "translate-x-0"
                                                    }`}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Sponsor Judging Toggle */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                Enable Sponsor Judging
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Allow sponsors to evaluate
                                                submissions for their specific
                                                prize categories.
                                            </p>
                                        </div>
                                        <div className="relative inline-block w-12 align-middle select-none">
                                            <input
                                                type="checkbox"
                                                name="toggle"
                                                id="toggle-sponsor-judging"
                                                className="sr-only peer"
                                                checked={sponsorJudgingEnabled}
                                                onChange={toggleSponsorJudging}
                                                disabled={
                                                    isSaving.sponsor_judging_enabled
                                                }
                                            />
                                            <label
                                                htmlFor="toggle-sponsor-judging"
                                                className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-[rgb(var(--mesa-green))] ${
                                                    isSaving.sponsor_judging_enabled
                                                        ? "opacity-50"
                                                        : ""
                                                }`}
                                            >
                                                <span
                                                    className={`absolute inset-y-0 left-0 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
                                                        sponsorJudgingEnabled
                                                            ? "translate-x-6"
                                                            : "translate-x-0"
                                                    }`}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Notifications Settings Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
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
                                                Send reminder emails to all
                                                students who have not yet
                                                submitted an application.
                                            </p>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleNotifyNonApplicants}
                                            disabled={isNotifying}
                                            className="cursor-pointer px-4 py-2 bg-[rgb(var(--mesa-warm-red))] text-white rounded-md disabled:bg-opacity-70 disabled:cursor-not-allowed"
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
                                                                            {
                                                                                err
                                                                            }
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
            )}
        </div>
    );
}
