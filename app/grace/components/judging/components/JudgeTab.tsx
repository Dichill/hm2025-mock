import React from "react";
import { Project } from "@/core/grace/types/project.dto";
import ProjectScoreForm, { MainScoreState } from "./ProjectScoreForm";
import AwardScoreForm from "./AwardScoreForm";
import { AwardCategory } from "@/core/grace/types/judge.dto";

/**
 * Properties for the JudgeTab component
 */
export interface JudgeTabProps {
    /** The project being scored, if any */
    project: Project | null;
    /** Whether this is editing an existing score */
    isEditing: boolean;
    /** The current table number in the search box */
    tableNumber: string;
    /** Function to set the table number */
    setTableNumber: (value: string) => void;
    /** Whether a project search is in progress */
    findingProject: boolean;
    /** Whether a score submission is in progress */
    submitting: boolean;
    /** Main score state */
    mainScore: MainScoreState;
    /** Award scores keyed by category ID */
    awardScores: Record<string, number>;
    /** Award categories */
    awardCategories: AwardCategory[];
    /** Function to handle finding a project */
    handleFindProject: () => void;
    /** Function to handle slider changes */
    handleSliderChange: (name: string, value: number) => void;
    /** Function to handle checkbox changes */
    handleCheckboxChange: (name: string, checked: boolean) => void;
    /** Function to handle award score changes */
    handleAwardScoreChange: (awardId: string, score: number) => void;
    /** Function to submit scores */
    handleSubmit: () => void;
}

/**
 * Component for the project judging tab
 */
const JudgeTab: React.FC<JudgeTabProps> = ({
    project,
    isEditing,
    tableNumber,
    setTableNumber,
    findingProject,
    submitting,
    mainScore,
    awardScores,
    awardCategories,
    handleFindProject,
    handleSliderChange,
    handleCheckboxChange,
    handleAwardScoreChange,
    handleSubmit,
}) => {
    // Combined loading state
    const isLoading = findingProject || submitting;

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100">
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[rgb(var(--mesa-purple))]/20 rounded-full flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[rgb(var(--mesa-purple))]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h2 className="ml-3 text-lg font-semibold">
                    {isEditing ? "Edit Scores" : "Project Scoring"}
                </h2>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        placeholder="Enter table number"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-purple))]"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleFindProject}
                        disabled={isLoading}
                        className="px-4 py-2 bg-[rgb(var(--mesa-purple))] text-white rounded-md hover:bg-[rgb(var(--mesa-purple))]/90 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-purple))]/50 disabled:opacity-50 transition-colors"
                    >
                        {findingProject ? "Finding..." : "Find Project"}
                    </button>
                </div>
            </div>

            {project ? (
                <div className="space-y-6">
                    <ProjectScoreForm
                        project={project}
                        isEditing={isEditing}
                        mainScore={mainScore}
                        onSliderChange={handleSliderChange}
                        onCheckboxChange={handleCheckboxChange}
                    />

                    <AwardScoreForm
                        project={project}
                        awardCategories={awardCategories}
                        awardScores={awardScores}
                        onAwardScoreChange={handleAwardScoreChange}
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={submitting || findingProject}
                        className="w-full mt-8 px-4 py-3 bg-[rgb(var(--mesa-warm-red))] text-white rounded-md hover:bg-[rgb(var(--mesa-warm-red))]/90 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-warm-red))]/50 disabled:opacity-50 transition-colors font-medium"
                    >
                        {submitting
                            ? "Submitting..."
                            : isEditing
                            ? "Update Scores"
                            : "Submit Scores"}
                    </button>
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-600">
                        Enter a table number above to find and score a project
                    </p>
                </div>
            )}
        </div>
    );
};

export default JudgeTab;
