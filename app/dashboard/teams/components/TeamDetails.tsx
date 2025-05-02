import React from "react";
import { TeamWithMembers } from "@/core/grace/types/team.dto";

/**
 * Props for the TeamDetails component
 */
interface TeamDetailsProps {
    selectedTeam: TeamWithMembers | null;
    userTeam: TeamWithMembers | null;
    joinLoading: string | null;
    onLeaveTeam: (teamId: string) => void;
}

/**
 * Component to display details of a selected team
 */
const TeamDetails: React.FC<TeamDetailsProps> = ({
    selectedTeam,
    userTeam,
    joinLoading,
    onLeaveTeam,
}) => {
    if (!selectedTeam) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
                <svg
                    className="h-16 w-16 text-gray-300 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                <p className="text-lg">Select a team to view details</p>
                <p className="text-sm mt-1">
                    Or create your own team to get started
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{selectedTeam.name}</h3>
                <p className="text-gray-500 text-sm">
                    Created on{" "}
                    {new Date(selectedTeam.created_at).toLocaleDateString()}
                </p>
            </div>

            <div className="mb-8">
                <h4 className="text-base font-medium mb-3 flex items-center">
                    <svg
                        className="h-5 w-5 mr-2 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    Team Members
                </h4>
                <ul className="space-y-3">
                    {selectedTeam.members.map((member) => (
                        <li
                            key={member.id}
                            className="flex items-center p-2 rounded-lg bg-gray-50"
                        >
                            <div className="w-10 h-10 bg-[rgb(var(--mesa-blue))]/10 text-[rgb(var(--mesa-blue))] rounded-full flex items-center justify-center mr-3 font-medium">
                                {member.full_name
                                    ? member.full_name.charAt(0).toUpperCase()
                                    : "?"}
                            </div>
                            <div>
                                <p className="font-medium flex items-center">
                                    {member.full_name || "Anonymous User"}
                                    {member.role === "LEADER" && (
                                        <span className="ml-2 text-xs bg-[rgb(var(--mesa-blue))]/10 text-[rgb(var(--mesa-blue))] px-2 py-0.5 rounded-full">
                                            Leader
                                        </span>
                                    )}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {member.role === "MEMBER"
                                        ? "Team Member"
                                        : "Team Leader"}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Only show leave button for user's team */}
            {userTeam && userTeam.id === selectedTeam.id && (
                <button
                    onClick={() => onLeaveTeam(selectedTeam.id)}
                    disabled={joinLoading === selectedTeam.id}
                    className="cursor-pointer w-full px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                >
                    {joinLoading === selectedTeam.id ? (
                        <div className="flex items-center">
                            <div className="w-3 h-3 mr-2 border-2 border-t-transparent border-red-600 rounded-full animate-spin"></div>
                            <span>Leaving...</span>
                        </div>
                    ) : (
                        <>
                            <svg
                                className="h-4 w-4 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L14 11.586V7z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Leave Team
                        </>
                    )}
                </button>
            )}
        </div>
    );
};

export default TeamDetails;
