import React from "react";
import { TeamWithMembers } from "@/core/grace/types/team.dto";

/**
 * Props for the UserTeam component
 */
interface UserTeamProps {
    team: TeamWithMembers;
    joinLoading: string | null;
    onLeaveTeam: (teamId: string) => void;
}

/**
 * Component to display the user's current team
 */
const UserTeam: React.FC<UserTeamProps> = ({
    team,
    joinLoading,
    onLeaveTeam,
}) => {
    return (
        <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">My Team</h2>
            <div className="p-4 rounded-lg border border-[rgb(var(--mesa-blue))]/20 bg-[rgb(var(--mesa-blue))]/5">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-lg">{team.name}</h3>
                        <p className="text-gray-500 text-sm">
                            Joined on{" "}
                            {new Date(team.created_at).toLocaleDateString()}
                        </p>
                        <div className="mt-2 text-xs font-medium text-[rgb(var(--mesa-blue))]">
                            {team.members.length} member
                            {team.members.length !== 1 ? "s" : ""}
                        </div>
                    </div>
                    <button
                        onClick={() => onLeaveTeam(team.id)}
                        disabled={joinLoading === team.id}
                        className="cursor-pointer px-3 py-1.5 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                        {joinLoading === team.id ? (
                            <div className="flex items-center">
                                <div className="w-3 h-3 mr-1 border-2 border-t-transparent border-red-600 rounded-full animate-spin"></div>
                                <span>Leaving</span>
                            </div>
                        ) : (
                            "Leave"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserTeam;
