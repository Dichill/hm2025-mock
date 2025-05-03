"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { publicSettingsApi } from "@/core/grace/api/settings";
import { Setting } from "@/core/grace/types/settings.dto";
import {
    joinTeamByCode,
    leaveTeam,
    getMyTeam,
    createTeam,
    removeTeamMember,
} from "@/core/grace/api/team";
import { TeamWithMembers } from "@/core/grace/types/team.dto";
import TeamFormationDisabled from "./components/TeamFormationDisabled";

// Animation variants
const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5 },
    },
};

const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};

/**
 * API error response interface
 */
interface ApiErrorResponse {
    response?: {
        status?: number;
        data?: {
            message?: string;
        };
    };
    message?: string;
}

/**
 * Teams management page component for hackathon participants
 * Allows users to create and join teams using invitation codes
 */
export default function TeamsPage(): React.ReactElement {
    const [isClient, setIsClient] = useState(false);
    const [teamFormationEnabled, setTeamFormationEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userTeam, setUserTeam] = useState<TeamWithMembers | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [isCreating, setIsCreating] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");

    const [isJoining, setIsJoining] = useState(false);
    const [joinCode, setJoinCode] = useState("");

    const [isRemoving, setIsRemoving] = useState<string | null>(null);

    const [activeView, setActiveView] = useState<"join" | "create" | "team">(
        "join"
    );

    /**
     * Fetch user's current team if they're in one
     */
    const fetchUserTeam = async (): Promise<void> => {
        try {
            const team = await getMyTeam();
            if (team) {
                setUserTeam(team);
                setActiveView("team");
            } else {
                setUserTeam(null);
                setActiveView("join");
            }
        } catch (error) {
            console.error("Error fetching user team:", error);
            setUserTeam(null);
        }
    };

    /**
     * Handle creating a new team
     * @param e - Form submission event
     */
    const handleCreateTeam = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!newTeamName.trim()) {
            setError("Team name cannot be empty");
            return;
        }

        try {
            setIsCreating(true);
            setError(null);

            const newTeam = await createTeam(newTeamName.trim());
            await fetchUserTeam();

            setSuccessMessage(
                `Team created successfully! Your team code is: ${newTeam.code}`
            );
            setNewTeamName("");
        } catch (error) {
            console.error("Error creating team:", error);
            setError(
                "Failed to create team. You might already be in another team."
            );
        } finally {
            setIsCreating(false);
        }
    };

    /**
     * Handle joining a team by code
     * @param e - Form submission event
     */
    const handleJoinTeam = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!joinCode.trim() || joinCode.length !== 8) {
            setError("Please enter a valid 8-character team code");
            return;
        }

        try {
            setIsJoining(true);
            setError(null);

            await joinTeamByCode(joinCode.trim());
            await fetchUserTeam();

            setSuccessMessage("Successfully joined the team!");
            setJoinCode("");
        } catch (error: unknown) {
            console.error("Error joining team:", error);
            const apiError = error as ApiErrorResponse;

            if (apiError.response?.status === 404) {
                setError("Invalid team code");
            } else if (apiError.response?.status === 409) {
                setError("You are already in a team");
            } else if (apiError.response?.status === 400) {
                setError("Team is full (maximum 4 members)");
            } else {
                setError("Failed to join team. Please try again.");
            }
        } finally {
            setIsJoining(false);
        }
    };

    /**
     * Handle leaving a team
     */
    const handleLeaveTeam = async (): Promise<void> => {
        if (!userTeam) return;

        if (!window.confirm("Are you sure you want to leave this team?")) {
            return;
        }

        try {
            setIsLoading(true);
            await leaveTeam(userTeam.id);

            setSuccessMessage("You have left the team");
            await fetchUserTeam();
        } catch (error) {
            console.error("Error leaving team:", error);
            setError("Failed to leave team. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handle removing a team member
     * @param memberId - The ID of the member to remove
     * @param name - The name of the member being removed
     */
    const handleRemoveMember = async (
        memberId: string,
        name: string
    ): Promise<void> => {
        if (!userTeam) return;

        if (
            !window.confirm(
                `Are you sure you want to remove ${name} from the team?`
            )
        ) {
            return;
        }

        try {
            setIsRemoving(memberId);
            await removeTeamMember(userTeam.id, memberId);

            setSuccessMessage(`${name} was removed from the team`);
            await fetchUserTeam();
        } catch (error: unknown) {
            console.error("Error removing team member:", error);
            const apiError = error as ApiErrorResponse;

            if (apiError.response?.status === 403) {
                setError("You don't have permission to remove team members");
            } else {
                setError("Failed to remove team member. Please try again.");
            }
        } finally {
            setIsRemoving(null);
        }
    };

    /**
     * Copy team code to clipboard
     */
    const copyCodeToClipboard = (): void => {
        if (!userTeam) return;

        navigator.clipboard.writeText(userTeam.code);
        setSuccessMessage("Team code copied to clipboard!");

        setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
    };

    const isTeamCreator = (): boolean => {
        if (!userTeam?.members) return false;

        const currentMember = userTeam.members.find(
            (member) => member.role === "Creator"
        );
        return !!currentMember;
    };

    const switchView = (view: "join" | "create" | "team"): void => {
        setError(null);
        setSuccessMessage(null);
        setActiveView(view);
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        setIsClient(true);

        const fetchTeamFormationStatus = async (): Promise<void> => {
            try {
                const setting: Setting = await publicSettingsApi.getByName(
                    "team_formation_enabled"
                );

                if (
                    typeof setting.value === "object" &&
                    setting.value !== null &&
                    "enabled" in setting.value &&
                    typeof setting.value.enabled === "boolean"
                ) {
                    setTeamFormationEnabled(setting.value.enabled);

                    if (setting.value.enabled) {
                        await fetchUserTeam();
                    }
                } else {
                    console.error(
                        "Unexpected format for team_formation_enabled setting:",
                        setting.value
                    );
                }
            } catch (error) {
                console.error("Error fetching team formation status:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamFormationStatus();
    }, []);

    if (!isClient || isLoading) {
        return (
            <div className="flex items-center justify-center h-full py-20">
                <div className="w-16 h-16 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!teamFormationEnabled) {
        return <TeamFormationDisabled />;
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="container mx-auto px-4 py-6 max-w-3xl"
        >
            {/* Page header */}
            <motion.div variants={slideUp} className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-3">Hackathon Teams</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    {userTeam
                        ? "Manage your hackathon team and members"
                        : "Create a new team or join an existing one with an invitation code. Do note that even if you are going solo, you must still create a team for yourself to participate in the hackathon."}
                </p>
            </motion.div>

            {/* Notification area */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
                    >
                        {error}
                    </motion.div>
                )}

                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6"
                    >
                        {successMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content area */}
            <motion.div
                variants={slideUp}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
                {/* If user is not in a team, show join/create options */}
                {!userTeam ? (
                    <div className="p-6">
                        {/* Tab navigation */}
                        <div className="flex border-b border-gray-200 mb-6">
                            <button
                                onClick={() => switchView("join")}
                                className={`px-4 py-2 font-medium ${
                                    activeView === "join"
                                        ? "border-b-2 border-[rgb(var(--mesa-orange))] text-[rgb(var(--mesa-orange))]"
                                        : "text-gray-500"
                                }`}
                            >
                                Join a Team
                            </button>
                            <button
                                onClick={() => switchView("create")}
                                className={`px-4 py-2 font-medium ${
                                    activeView === "create"
                                        ? "border-b-2 border-[rgb(var(--mesa-orange))] text-[rgb(var(--mesa-orange))]"
                                        : "text-gray-500"
                                }`}
                            >
                                Create a Team
                            </button>
                        </div>

                        {/* Join team form */}
                        {activeView === "join" && (
                            <div className="max-w-md mx-auto">
                                <h2 className="text-xl font-semibold mb-4">
                                    Join an Existing Team
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Enter the 8-character team code shared with
                                    you by your team.
                                </p>

                                <form onSubmit={handleJoinTeam}>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="teamCode"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Team Code
                                        </label>
                                        <input
                                            id="teamCode"
                                            type="text"
                                            value={joinCode}
                                            onChange={(e) =>
                                                setJoinCode(
                                                    e.target.value.toUpperCase()
                                                )
                                            }
                                            placeholder="TEAM CODE"
                                            maxLength={8}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))] focus:border-transparent"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={
                                            isJoining || joinCode.length !== 8
                                        }
                                        className="w-full px-4 py-2 bg-[rgb(var(--mesa-orange))] text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isJoining ? "Joining..." : "Join Team"}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Create team form */}
                        {activeView === "create" && (
                            <div className="max-w-md mx-auto">
                                <h2 className="text-xl font-semibold mb-4">
                                    Create a New Team
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Create your own team and invite others using
                                    the generated team code.
                                </p>

                                <form onSubmit={handleCreateTeam}>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="teamName"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Team Name
                                        </label>
                                        <input
                                            id="teamName"
                                            type="text"
                                            value={newTeamName}
                                            onChange={(e) =>
                                                setNewTeamName(e.target.value)
                                            }
                                            placeholder="Enter team name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))] focus:border-transparent"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={
                                            isCreating || !newTeamName.trim()
                                        }
                                        className="w-full px-4 py-2 bg-[rgb(var(--mesa-orange))] text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isCreating
                                            ? "Creating..."
                                            : "Create Team"}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                ) : (
                    /* If user is in a team, show team details */
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold">
                                {userTeam.name}
                            </h2>
                            <div className="mt-2 flex items-center">
                                <div className="bg-gray-100 px-3 py-1 rounded-md flex items-center mr-2">
                                    <span className="text-gray-700 font-mono mr-2">
                                        Code: {userTeam.code}
                                    </span>
                                    <button
                                        onClick={copyCodeToClipboard}
                                        className="text-[rgb(var(--mesa-orange))] hover:text-[rgb(var(--mesa-orange-darker))]"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Created{" "}
                                    {new Date(
                                        userTeam.created_at
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-3">
                                Team Members
                            </h3>
                            <div className="bg-gray-50 rounded-lg">
                                {userTeam.members &&
                                    userTeam.members.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0"
                                        >
                                            <div className="flex items-center">
                                                <div className="mr-3">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <span className="text-gray-500">
                                                            {member.full_name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-medium">
                                                        {member.full_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {member.role}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Remove member button - only shown to creator and not for themselves */}
                                            {isTeamCreator() &&
                                                member.role !== "Creator" && (
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveMember(
                                                                member.id,
                                                                member.full_name
                                                            )
                                                        }
                                                        disabled={
                                                            isRemoving ===
                                                            member.id
                                                        }
                                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                    >
                                                        {isRemoving ===
                                                        member.id
                                                            ? "Removing..."
                                                            : "Remove"}
                                                    </button>
                                                )}
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="mt-8 border-t pt-6">
                            <button
                                onClick={handleLeaveTeam}
                                className="px-4 py-2 text-red-600 border border-red-200 rounded-md hover:bg-red-50"
                            >
                                Leave Team
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
