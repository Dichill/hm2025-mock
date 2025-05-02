import React from "react";
import { Team, TeamWithMembers } from "@/core/grace/types/team.dto";

/**
 * Props for the TeamsList component
 */
interface TeamsListProps {
    teams: Team[];
    searchQuery: string;
    selectedTeam: TeamWithMembers | null;
    userTeam: TeamWithMembers | null;
    joinLoading: string | null;
    onTeamSelect: (teamId: string) => void;
    onJoinTeam: (teamId: string) => void;
}

/**
 * Component to display a list of available teams that can be joined
 */
const TeamsList: React.FC<TeamsListProps> = ({
    teams,
    searchQuery,
    selectedTeam,
    userTeam,
    joinLoading,
    onTeamSelect,
    onJoinTeam,
}) => {
    // Filter teams based on search query and exclude user's team
    const filteredTeams = teams.filter(
        (team) =>
            team.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!userTeam || team.id !== userTeam.id)
    );

    return (
        <div className="overflow-y-auto max-h-[400px] -mx-6 px-6">
            {filteredTeams.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                    {filteredTeams.map((team) => (
                        <li key={team.id}>
                            <div
                                onClick={() => onTeamSelect(team.id)}
                                className={`w-full text-left px-4 py-4 rounded-lg mb-1 transition-colors cursor-pointer ${
                                    selectedTeam?.id === team.id &&
                                    team.id !== userTeam?.id
                                        ? "bg-[rgb(var(--mesa-blue))]/5 border-[rgb(var(--mesa-blue))]/20 border"
                                        : "hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-medium">
                                            {team.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            Created{" "}
                                            {new Date(
                                                team.created_at
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onJoinTeam(team.id);
                                        }}
                                        disabled={
                                            joinLoading === team.id ||
                                            userTeam !== null
                                        }
                                        className={`cursor-pointer px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                            userTeam !== null
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : "bg-[rgb(var(--mesa-blue))]/10 text-[rgb(var(--mesa-blue))] hover:bg-[rgb(var(--mesa-blue))]/20"
                                        }`}
                                    >
                                        {joinLoading === team.id ? (
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 mr-1 border-2 border-t-transparent border-[rgb(var(--mesa-blue))] rounded-full animate-spin"></div>
                                                <span>Joining</span>
                                            </div>
                                        ) : userTeam !== null ? (
                                            "Already in a team"
                                        ) : (
                                            "Join"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : userTeam ? (
                <div className="text-center py-12 text-gray-500">
                    <svg
                        className="mx-auto h-10 w-10 text-gray-400 mb-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <p>No other teams found</p>
                    {searchQuery && (
                        <p className="mt-1">
                            No matches for &quot;{searchQuery}&quot;
                        </p>
                    )}
                </div>
            ) : searchQuery ? (
                <div className="text-center py-12 text-gray-500">
                    <svg
                        className="mx-auto h-10 w-10 text-gray-400 mb-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <p>No teams found matching &quot;{searchQuery}&quot;</p>
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500">
                    <svg
                        className="mx-auto h-10 w-10 text-gray-400 mb-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                    </svg>
                    <p>No teams available yet</p>
                    <p className="text-sm mt-1">Be the first to create one!</p>
                </div>
            )}
        </div>
    );
};

export default TeamsList;
