"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { publicSettingsApi } from "@/core/grace/api/settings";
import { Setting } from "@/core/grace/types/settings.dto";
import {
    getAllTeams,
    joinTeam,
    leaveTeam,
    getTeamById,
    createTeam,
} from "@/core/grace/api/team";
import { Team, TeamWithMembers } from "@/core/grace/types/team.dto";

// Import components
import TeamsList from "./components/TeamsList";
import UserTeam from "./components/UserTeam";
import TeamDetails from "./components/TeamDetails";
import CreateTeamModal from "./components/CreateTeamModal";
import SearchInput from "./components/SearchInput";
import ErrorMessage from "./components/ErrorMessage";
import TeamFormationDisabled from "./components/TeamFormationDisabled";

/**
 * Teams management page component for hackathon participants
 * Allows users to create, join, and manage teams
 */
export default function TeamsPage(): React.ReactElement {
    // State management
    const [isClient, setIsClient] = useState(false);
    const [teamFormationEnabled, setTeamFormationEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<TeamWithMembers | null>(
        null
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [joinLoading, setJoinLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [userTeam, setUserTeam] = useState<TeamWithMembers | null>(null);

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

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3 },
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.2 },
        },
    };

    /**
     * Fetch all available teams from the API
     */
    const fetchAllTeams = async (): Promise<void> => {
        try {
            const teamsData = await getAllTeams();
            setTeams(teamsData);

            // Check if the user is in any team and set it as userTeam
            for (const team of teamsData) {
                try {
                    const teamDetails = await getTeamById(team.id);
                    // Check if the user is a member of this team
                    // This assumes that the API returns only teams where the user is a member
                    if (teamDetails.members && teamDetails.members.length > 0) {
                        // Check if any members have the "isCurrent" flag or similar
                        // Since we don't have a direct way to identify the current user,
                        // we'll assume that if the team has members, and we can get its details,
                        // the user might be part of it
                        setUserTeam(teamDetails);
                        setSelectedTeam(teamDetails);
                        break;
                    }
                } catch (error) {
                    console.error("Error fetching team details:", error);
                }
            }
        } catch (error) {
            console.error("Error fetching teams:", error);
            setError("Failed to load teams. Please try again later.");
        }
    };

    /**
     * Handle joining a team by ID
     * @param teamId - The ID of the team to join
     */
    const handleJoinTeam = async (teamId: string): Promise<void> => {
        try {
            setJoinLoading(teamId);
            await joinTeam(teamId);

            // Refresh teams list and select the joined team
            await fetchAllTeams();
            const joinedTeam = await getTeamById(teamId);
            setSelectedTeam(joinedTeam);
            setUserTeam(joinedTeam); // Set as user's team
            setError(null);
        } catch (error) {
            console.error("Error joining team:", error);
            setError(
                "Failed to join team. You might already be in another team."
            );
        } finally {
            setJoinLoading(null);
        }
    };

    /**
     * Handle leaving a team by ID
     * @param teamId - The ID of the team to leave
     */
    const handleLeaveTeam = async (teamId: string): Promise<void> => {
        try {
            setJoinLoading(teamId);
            await leaveTeam(teamId);

            // Refresh teams list and clear selected team
            await fetchAllTeams();
            setSelectedTeam(null);
            setUserTeam(null); // Clear user's team
            setError(null);
        } catch (error) {
            console.error("Error leaving team:", error);
            setError("Failed to leave team. Please try again later.");
        } finally {
            setJoinLoading(null);
        }
    };

    /**
     * Handle team selection to view details
     * @param teamId - The ID of the team to select
     */
    const handleTeamSelect = async (teamId: string): Promise<void> => {
        try {
            const teamData = await getTeamById(teamId);
            setSelectedTeam(teamData);
        } catch (error) {
            console.error("Error fetching team details:", error);
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

            // Refresh the teams list and select the newly created team
            await fetchAllTeams();
            const createdTeam = await getTeamById(newTeam.id);
            setSelectedTeam(createdTeam);
            setUserTeam(createdTeam); // Set as user's team

            // Close the modal and reset form
            setIsCreateModalOpen(false);
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
     * Handle closing the create team modal
     */
    const handleCloseModal = (): void => {
        setIsCreateModalOpen(false);
        setNewTeamName("");
        setError(null);
    };

    // Initialization effects
    useEffect(() => {
        setIsClient(true);

        const fetchTeamFormationStatus = async (): Promise<void> => {
            try {
                const setting: Setting = await publicSettingsApi.getByName(
                    "team_formation_enabled"
                );

                // Type-safe check for the setting value
                if (
                    typeof setting.value === "object" &&
                    setting.value !== null &&
                    "enabled" in setting.value &&
                    typeof setting.value.enabled === "boolean"
                ) {
                    setTeamFormationEnabled(setting.value.enabled);
                    console.log("Team formation setting:", setting.value);

                    // If team formation is enabled, fetch teams
                    if (setting.value.enabled) {
                        await fetchAllTeams();
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

    // Loading state
    if (!isClient || isLoading) {
        return (
            <div className="flex items-center justify-center h-full py-20">
                <div className="w-16 h-16 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Team formation disabled view
    if (!teamFormationEnabled) {
        return <TeamFormationDisabled />;
    }

    // Main team formation view
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="container mx-auto px-4 py-6 max-w-5xl"
        >
            {/* Error notification */}
            <AnimatePresence>
                <ErrorMessage message={error} />
            </AnimatePresence>

            {/* Page header */}
            <motion.div variants={slideUp} className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-3">Hackathon Teams</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Create a new team or join an existing one to participate in
                    the hackathon.
                </p>
            </motion.div>

            {/* Create team button - only show if user is not in a team */}
            {!userTeam && (
                <motion.div variants={slideUp} className="mb-8 text-center">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="cursor-pointer px-6 py-2 bg-[rgb(var(--mesa-orange))] text-white rounded-md font-medium"
                    >
                        Create New Team
                    </button>
                </motion.div>
            )}

            {/* Main content area */}
            <motion.div
                variants={slideUp}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
                <div className="flex flex-col lg:flex-row">
                    {/* Teams list panel */}
                    <div className="lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-100">
                        <div className="p-6">
                            {/* My Team Section - only visible if user has a team */}
                            {userTeam && (
                                <UserTeam
                                    team={userTeam}
                                    joinLoading={joinLoading}
                                    onLeaveTeam={handleLeaveTeam}
                                />
                            )}

                            {/* Search input */}
                            <SearchInput
                                value={searchQuery}
                                onChange={setSearchQuery}
                            />

                            <h2 className="text-lg font-medium mb-3">
                                Available Teams
                            </h2>

                            {/* Teams list */}
                            <TeamsList
                                teams={teams}
                                searchQuery={searchQuery}
                                selectedTeam={selectedTeam}
                                userTeam={userTeam}
                                joinLoading={joinLoading}
                                onTeamSelect={handleTeamSelect}
                                onJoinTeam={handleJoinTeam}
                            />
                        </div>
                    </div>

                    {/* Team details panel */}
                    <div className="lg:w-1/2">
                        <div className="p-6">
                            <h2 className="text-lg font-medium mb-4">
                                Team Details
                            </h2>

                            <TeamDetails
                                selectedTeam={selectedTeam}
                                userTeam={userTeam}
                                joinLoading={joinLoading}
                                onLeaveTeam={handleLeaveTeam}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Create Team Modal - only available if user is not in a team */}
            <AnimatePresence>
                <CreateTeamModal
                    isOpen={isCreateModalOpen && !userTeam}
                    teamName={newTeamName}
                    isCreating={isCreating}
                    scaleIn={scaleIn}
                    onNameChange={setNewTeamName}
                    onClose={handleCloseModal}
                    onSubmit={handleCreateTeam}
                />
            </AnimatePresence>
        </motion.div>
    );
}
