import React, { useState } from "react";
import { Project } from "@/core/grace/types/project.dto";

/**
 * Score state for main project evaluation
 */
export interface MainScoreState {
    technical_complexity: number;
    potential_impact: number;
    design_implementation: number;
    presentation: number;
    bonus_scalability: boolean;
    bonus_all_participated: boolean;
    bonus_task_division: boolean;
}

/**
 * Properties for the ProjectScoreForm component
 */
export interface ProjectScoreFormProps {
    /** The project being scored */
    project: Project;
    /** Whether this is editing an existing score */
    isEditing: boolean;
    /** The current score state */
    mainScore: MainScoreState;
    /** Function to handle slider changes */
    onSliderChange: (name: string, value: number) => void;
    /** Function to handle checkbox changes */
    onCheckboxChange: (name: string, checked: boolean) => void;
}

/**
 * Component for scoring a project on main criteria (technical, impact, design, presentation)
 * as well as bonus criteria
 */
const ProjectScoreForm: React.FC<ProjectScoreFormProps> = ({
    project,
    isEditing,
    mainScore,
    onSliderChange,
    onCheckboxChange,
}) => {
    // Track expanded/collapsed state for each section
    const [expandedSections, setExpandedSections] = useState<
        Record<string, boolean>
    >({
        technical_complexity: true,
        potential_impact: true,
        design_implementation: true,
        presentation: true,
        bonus: true,
    });

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const criteriaDescriptions = {
        technical_complexity: [
            "No functioning tech or non-original work",
            "Mostly templated code or low-effort implementation",
            "Mostly frontend or static page with basic interactivity",
            "Custom-coded web/mobile app with libraries (e.g., charting, auth, CRUD), moderate integrations",
            "Uses frameworks or engines (e.g., Unity, Next.js, game engine, Firebase), shows custom logic",
            "Uses advanced system design, real-time systems, ML models, cloud APIs, and multiple integrated services",
        ],
        potential_impact: [
            "No clear impact, or problem not defined",
            "Limited value or unclear use case",
            "Useful but generic (e.g., task tracker, game, calculator)",
            "Solves a general or student-identified problem with moderate relevance",
            "Strong problem-solving potential; addresses a clear real-world issue",
            "Solves a major, well-articulated problem in STEM or an underserved community; realistic and scalable",
        ],
        design_implementation: [
            "No implementation or unable to demo at all",
            "Prototype/demo only, doesn't run or broken logic",
            "Minimal functionality or incomplete implementation",
            "Basic functionality works, some bugs or rough UI",
            "Mostly functional, some polish, handles user input/errors",
            "Fully functional, complete UI/UX, responsive, robust demo",
        ],
        presentation: [
            "No team member presented or refused to explain project",
            "Hard to follow or disorganized presentation",
            "Vague explanation, missed key features or problem statements",
            "Understandable pitch, but missing some clarity or delivery issues",
            "Mostly clear and structured, answered judge questions well",
            "Clear, engaging, confident pitch with great explanation and structure",
        ],
    };

    const criteriaLabels = {
        technical_complexity: "Technical Complexity",
        potential_impact: "Potential Impact",
        design_implementation: "Design, Implementation & Execution",
        presentation: "Presentation",
    };

    const criteriaQuestions = {
        technical_complexity: "How technically impressive is the project?",
        potential_impact: "How meaningful or useful is the solution?",
        design_implementation: "Does the project function, and is it usable?",
        presentation:
            "Did the team explain the project clearly and confidently?",
    };

    const criteriaIcons = {
        technical_complexity: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        potential_impact: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        design_implementation: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        presentation: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    };

    /**
     * Calculate the total score including bonus points
     */
    const calculateTotalScore = () => {
        const mainScores =
            mainScore.technical_complexity +
            mainScore.potential_impact +
            mainScore.design_implementation +
            mainScore.presentation;

        const bonusPoints =
            (mainScore.bonus_scalability ? 1 : 0) +
            (mainScore.bonus_all_participated ? 1 : 0) +
            (mainScore.bonus_task_division ? 1 : 0);

        return {
            mainScores,
            bonusPoints,
            total: mainScores + bonusPoints,
            maxPossible: 20 + 3, // 20 from main (4 categories × 5 points) + 3 from bonus
        };
    };

    const scoreInfo = calculateTotalScore();

    /**
     * Get a color class based on score percentage
     */
    const getScoreColorClass = (score: number, maxScore: number) => {
        const percentage = (score / maxScore) * 100;

        if (percentage >= 80) return "text-green-600";
        if (percentage >= 60) return "text-blue-600";
        if (percentage >= 40) return "text-yellow-600";
        if (percentage >= 20) return "text-orange-600";
        return "text-red-600";
    };

    /**
     * Renders the score options for a criteria
     */
    const renderScoreOptions = (
        criteriaKey: keyof typeof criteriaDescriptions
    ) => {
        return (
            <div className="space-y-3 mt-4">
                {[0, 1, 2, 3, 4, 5].map((score) => {
                    const isSelected = mainScore[criteriaKey] === score;
                    const scoreClass = isSelected
                        ? "bg-[rgb(var(--mesa-purple))]/10 border-[rgb(var(--mesa-purple))]"
                        : "border-gray-200 hover:bg-gray-50";

                    return (
                        <div
                            key={score}
                            className={`flex items-start p-3 border rounded-lg transition-colors ${scoreClass} cursor-pointer`}
                            onClick={() => onSliderChange(criteriaKey, score)}
                        >
                            <div className="flex items-center h-5 mt-1">
                                <input
                                    id={`${criteriaKey}-${score}`}
                                    name={criteriaKey}
                                    type="radio"
                                    checked={isSelected}
                                    onChange={() =>
                                        onSliderChange(criteriaKey, score)
                                    }
                                    className="h-4 w-4 text-[rgb(var(--mesa-purple))] border-gray-300 focus:ring-[rgb(var(--mesa-purple))]"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor={`${criteriaKey}-${score}`}
                                    className={`font-medium ${
                                        isSelected
                                            ? "text-[rgb(var(--mesa-purple))]"
                                            : ""
                                    }`}
                                >
                                    {score} -{" "}
                                    {criteriaDescriptions[criteriaKey][score]}
                                </label>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Project information card */}
            <div className="bg-gradient-to-br from-[rgb(var(--mesa-purple))]/5 to-[rgb(var(--mesa-purple))]/10 p-5 rounded-lg border border-[rgb(var(--mesa-purple))]/20">
                <div className="flex flex-wrap items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-lg text-[rgb(var(--mesa-purple))]">
                            {project.name}{" "}
                            {isEditing && (
                                <span className="text-sm font-normal text-gray-600">
                                    (Editing)
                                </span>
                            )}
                        </h3>
                        <p className="text-sm text-[rgb(var(--mesa-purple))]/80">
                            Table #{project.table_number}
                        </p>
                        {project.track && (
                            <p className="text-sm mt-1">
                                Track: {project.track}
                            </p>
                        )}
                        <p className="mt-2 text-sm break-words">
                            <a
                                href={project.devpost_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                View on Devpost
                            </a>
                        </p>
                    </div>

                    {/* Score Summary Card */}
                    <div className="bg-white rounded-lg shadow-sm p-3 mt-2 md:mt-0 border border-[rgb(var(--mesa-purple))]/20">
                        <h4 className="font-medium text-sm text-gray-600 mb-1">
                            Score Summary
                        </h4>
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span>Main Criteria:</span>
                                <span>{scoreInfo.mainScores}/20</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Bonus Points:</span>
                                <span>{scoreInfo.bonusPoints}/3</span>
                            </div>
                            <div className="h-px bg-gray-200 my-1"></div>
                            <div className="flex justify-between font-semibold">
                                <span>Total Score:</span>
                                <span
                                    className={getScoreColorClass(
                                        scoreInfo.total,
                                        scoreInfo.maxPossible
                                    )}
                                >
                                    {scoreInfo.total}/{scoreInfo.maxPossible}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center">
                    <span className="bg-[rgb(var(--mesa-purple))]/10 p-1.5 rounded-full mr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[rgb(var(--mesa-purple))]"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                    Project Evaluation
                </h3>

                {/* Scoring Criteria */}
                {Object.keys(criteriaLabels).map((key) => {
                    const criteriaKey = key as keyof typeof criteriaLabels;
                    const isExpanded = expandedSections[criteriaKey];

                    return (
                        <div
                            key={key}
                            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200"
                        >
                            <div
                                className="bg-white p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                                onClick={() => toggleSection(criteriaKey)}
                            >
                                <div className="flex items-center">
                                    <div className="text-[rgb(var(--mesa-purple))] mr-3">
                                        {criteriaIcons[criteriaKey]}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium">
                                            {criteriaLabels[criteriaKey]}
                                        </h4>
                                        <p className="text-sm text-gray-600 italic">
                                            &ldquo;
                                            {criteriaQuestions[criteriaKey]}
                                            &rdquo;
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="font-medium text-lg mr-3">
                                        <span
                                            className={getScoreColorClass(
                                                mainScore[criteriaKey],
                                                5
                                            )}
                                        >
                                            {mainScore[criteriaKey]}
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            /5
                                        </span>
                                    </div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 transition-transform ${
                                            isExpanded ? "rotate-180" : ""
                                        }`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="px-4 pb-4 border-t border-gray-100">
                                    {renderScoreOptions(criteriaKey)}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Bonus Points Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200">
                    <div
                        className="bg-white p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSection("bonus")}
                    >
                        <div className="flex items-center">
                            <div className="text-[rgb(var(--mesa-warm-red))] mr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium">
                                    Bonus Points
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Additional points for exceptional qualities
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="font-medium text-lg mr-3">
                                <span
                                    className={getScoreColorClass(
                                        scoreInfo.bonusPoints,
                                        3
                                    )}
                                >
                                    {scoreInfo.bonusPoints}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    /3
                                </span>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 transition-transform ${
                                    expandedSections.bonus ? "rotate-180" : ""
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>

                    {expandedSections.bonus && (
                        <div className="px-4 pb-4 border-t border-gray-100">
                            <div className="space-y-3 mt-4">
                                <div
                                    className={`flex items-start p-3 border rounded-lg transition-colors ${
                                        mainScore.bonus_scalability
                                            ? "bg-[rgb(var(--mesa-warm-red))]/10 border-[rgb(var(--mesa-warm-red))]"
                                            : "border-gray-200 hover:bg-gray-50"
                                    }`}
                                >
                                    <div className="flex items-center h-5 mt-1">
                                        <input
                                            type="checkbox"
                                            id="scalability"
                                            checked={
                                                mainScore.bonus_scalability
                                            }
                                            onChange={(e) =>
                                                onCheckboxChange(
                                                    "bonus_scalability",
                                                    e.target.checked
                                                )
                                            }
                                            className="h-4 w-4 text-[rgb(var(--mesa-warm-red))] rounded border-gray-300 focus:ring-[rgb(var(--mesa-warm-red))]"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label
                                            htmlFor="scalability"
                                            className={`font-medium text-sm ${
                                                mainScore.bonus_scalability
                                                    ? "text-[rgb(var(--mesa-warm-red))]"
                                                    : ""
                                            }`}
                                        >
                                            +1 Scalability / Long-Term Potential
                                        </label>
                                        <p className="text-xs text-gray-600 mt-1">
                                            App could be deployed or
                                            realistically scaled (e.g.,
                                            cloud-ready, supports multiple
                                            users, MVP-ready)
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`flex items-start p-3 border rounded-lg transition-colors ${
                                        mainScore.bonus_all_participated
                                            ? "bg-[rgb(var(--mesa-warm-red))]/10 border-[rgb(var(--mesa-warm-red))]"
                                            : "border-gray-200 hover:bg-gray-50"
                                    }`}
                                >
                                    <div className="flex items-center h-5 mt-1">
                                        <input
                                            type="checkbox"
                                            id="all_participated"
                                            checked={
                                                mainScore.bonus_all_participated
                                            }
                                            onChange={(e) =>
                                                onCheckboxChange(
                                                    "bonus_all_participated",
                                                    e.target.checked
                                                )
                                            }
                                            className="h-4 w-4 text-[rgb(var(--mesa-warm-red))] rounded border-gray-300 focus:ring-[rgb(var(--mesa-warm-red))]"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label
                                            htmlFor="all_participated"
                                            className={`font-medium text-sm ${
                                                mainScore.bonus_all_participated
                                                    ? "text-[rgb(var(--mesa-warm-red))]"
                                                    : ""
                                            }`}
                                        >
                                            +1 All Members Participated
                                        </label>
                                        <p className="text-xs text-gray-600 mt-1">
                                            Every team member spoke or
                                            contributed during pitch/demo
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`flex items-start p-3 border rounded-lg transition-colors ${
                                        mainScore.bonus_task_division
                                            ? "bg-[rgb(var(--mesa-warm-red))]/10 border-[rgb(var(--mesa-warm-red))]"
                                            : "border-gray-200 hover:bg-gray-50"
                                    }`}
                                >
                                    <div className="flex items-center h-5 mt-1">
                                        <input
                                            type="checkbox"
                                            id="task_division"
                                            checked={
                                                mainScore.bonus_task_division
                                            }
                                            onChange={(e) =>
                                                onCheckboxChange(
                                                    "bonus_task_division",
                                                    e.target.checked
                                                )
                                            }
                                            className="h-4 w-4 text-[rgb(var(--mesa-warm-red))] rounded border-gray-300 focus:ring-[rgb(var(--mesa-warm-red))]"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label
                                            htmlFor="task_division"
                                            className={`font-medium text-sm ${
                                                mainScore.bonus_task_division
                                                    ? "text-[rgb(var(--mesa-warm-red))]"
                                                    : ""
                                            }`}
                                        >
                                            +1 Clear Task Division
                                        </label>
                                        <p className="text-xs text-gray-600 mt-1">
                                            Team explained how work was split
                                            (roles, GitHub commits, task boards,
                                            etc.)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectScoreForm;
