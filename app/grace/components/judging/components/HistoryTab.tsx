import React from "react";
import JudgingHistoryTable from "./JudgingHistoryTable";
import { ScoredProject } from "@/core/grace/types/judge.dto";

/**
 * Properties for the HistoryTab component
 */
export interface HistoryTabProps {
    /** The list of judged projects */
    judgedProjects: ScoredProject[];
    /** Whether the data is currently loading */
    isLoading: boolean;
    /** Error message, if any */
    error: string | null;
    /** Current judging round */
    round: number;
    /** Function to handle editing an existing score */
    onEditScore: (project: ScoredProject) => void;
}

/**
 * Component for displaying the judging history tab
 */
const HistoryTab: React.FC<HistoryTabProps> = ({
    judgedProjects,
    isLoading,
    error,
    round,
    onEditScore,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100">
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[rgb(var(--mesa-warm-red))]/20 rounded-full flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[rgb(var(--mesa-warm-red))]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                    </svg>
                </div>
                <h2 className="ml-3 text-lg font-semibold">
                    Your Judging History
                </h2>
            </div>

            <JudgingHistoryTable
                judgedProjects={judgedProjects}
                isLoading={isLoading}
                error={error}
                round={round}
                onEditScore={onEditScore}
            />
        </div>
    );
};

export default HistoryTab;
