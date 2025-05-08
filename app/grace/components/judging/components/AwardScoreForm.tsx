import React, { useState } from "react";
import { AwardCategory } from "@/core/grace/types/judge.dto";
import { Project } from "@/core/grace/types/project.dto";

/**
 * Properties for the AwardScoreForm component
 */
export interface AwardScoreFormProps {
    /** The project being scored */
    project: Project;
    /** List of all award categories */
    awardCategories: AwardCategory[];
    /** Current award scores keyed by category name */
    awardScores: Record<string, number>;
    /** Function to handle award score changes */
    onAwardScoreChange: (categoryName: string, score: number) => void;
}

/**
 * Component for scoring awards for a project
 */
const AwardScoreForm: React.FC<AwardScoreFormProps> = ({
    project,
    awardCategories,
    awardScores,
    onAwardScoreChange,
}) => {
    // Track expanded/collapsed state for each award category
    const [expandedCategories, setExpandedCategories] = useState<
        Record<string, boolean>
    >({});

    // Only show award form if project opted in for awards
    if (
        !project.awards_opt_in ||
        project.awards_opt_in.length === 0 ||
        awardCategories.length === 0
    ) {
        return null;
    }

    // Filter categories to only those the project opted for
    const eligibleCategories = awardCategories.filter(
        (category) =>
            project.awards_opt_in.includes(category.id) ||
            project.awards_opt_in.includes(category.name)
    );

    if (eligibleCategories.length === 0) {
        return null;
    }

    // Initialize expanded categories if not already set
    if (Object.keys(expandedCategories).length === 0) {
        setExpandedCategories(
            Object.fromEntries(
                eligibleCategories.map((cat) => [cat.name, true])
            )
        );
    }

    const toggleCategory = (categoryName: string) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryName]: !prev[categoryName],
        }));
    };

    /**
     * Calculate the total award score
     */
    const calculateTotalAwardScore = () => {
        let totalScore = 0;
        const maxPossible = eligibleCategories.length * 5;
        let scoredCategories = 0;

        eligibleCategories.forEach((category) => {
            if (awardScores[category.name] !== undefined) {
                totalScore += awardScores[category.name];
                scoredCategories++;
            }
        });

        return {
            totalScore,
            maxPossible,
            scoredCategories,
            totalCategories: eligibleCategories.length,
        };
    };

    const awardScoreInfo = calculateTotalAwardScore();

    /**
     * Get a color class based on score percentage
     */
    const getScoreColorClass = (score: number, maxScore: number) => {
        if (maxScore === 0) return "text-gray-400";

        const percentage = (score / maxScore) * 100;

        if (percentage >= 80) return "text-green-600";
        if (percentage >= 60) return "text-blue-600";
        if (percentage >= 40) return "text-yellow-600";
        if (percentage >= 20) return "text-orange-600";
        return "text-red-600";
    };

    return (
        <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap items-start justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-lg flex items-center">
                        <span className="bg-[rgb(var(--mesa-warm-red))]/10 p-1.5 rounded-full mr-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-[rgb(var(--mesa-warm-red))]"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </span>
                        <span className="text-[rgb(var(--mesa-warm-red))]">
                            Award Categories
                        </span>
                    </h3>
                    <p className="text-sm text-gray-600 ml-9">
                        This project has opted in for award consideration. Rate
                        each applicable category.
                    </p>
                </div>

                {/* Award Score Summary */}
                <div className="bg-white rounded-lg shadow-sm p-3 mt-2 md:mt-0 border border-[rgb(var(--mesa-warm-red))]/20">
                    <h4 className="font-medium text-sm text-gray-600 mb-1">
                        Award Summary
                    </h4>
                    <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>Categories Scored:</span>
                            <span>
                                {awardScoreInfo.scoredCategories}/
                                {awardScoreInfo.totalCategories}
                            </span>
                        </div>
                        <div className="h-px bg-gray-200 my-1"></div>
                        <div className="flex justify-between font-semibold">
                            <span>Total Score:</span>
                            <span
                                className={getScoreColorClass(
                                    awardScoreInfo.totalScore,
                                    awardScoreInfo.maxPossible
                                )}
                            >
                                {awardScoreInfo.totalScore}/
                                {awardScoreInfo.maxPossible}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {eligibleCategories.map((category) => {
                    const isExpanded = expandedCategories[category.name];
                    const currentScore =
                        awardScores[category.name] !== undefined
                            ? awardScores[category.name]
                            : 0;
                    const hasScore = awardScores[category.name] !== undefined;

                    return (
                        <div
                            key={category.name}
                            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200"
                        >
                            <div
                                className="bg-white p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                                onClick={() => toggleCategory(category.name)}
                            >
                                <div>
                                    <h4 className="text-lg font-medium">
                                        {category.name}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {category.description}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <div className="font-medium text-lg mr-3">
                                        {hasScore ? (
                                            <span
                                                className={getScoreColorClass(
                                                    currentScore,
                                                    5
                                                )}
                                            >
                                                {currentScore}
                                                <span className="text-gray-400 text-sm">
                                                    /5
                                                </span>
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 text-sm">
                                                Not scored
                                            </span>
                                        )}
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
                                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-4">
                                        {[0, 1, 2, 3, 4, 5].map((value) => {
                                            const isSelected =
                                                awardScores[category.name] ===
                                                value;
                                            return (
                                                <div
                                                    key={value}
                                                    className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                                                        isSelected
                                                            ? "bg-[rgb(var(--mesa-warm-red))]/10 border-[rgb(var(--mesa-warm-red))]"
                                                            : "border-gray-200 hover:bg-gray-50"
                                                    }`}
                                                    onClick={() =>
                                                        onAwardScoreChange(
                                                            category.name,
                                                            value
                                                        )
                                                    }
                                                >
                                                    <div className="text-2xl font-bold mb-1">
                                                        {value}
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            type="radio"
                                                            id={`${category.name}-${value}`}
                                                            name={`award-${category.name}`}
                                                            value={value}
                                                            checked={isSelected}
                                                            onChange={() =>
                                                                onAwardScoreChange(
                                                                    category.name,
                                                                    value
                                                                )
                                                            }
                                                            className="absolute opacity-0 h-5 w-5"
                                                        />
                                                        <label
                                                            htmlFor={`${category.name}-${value}`}
                                                            className={`text-xs ${
                                                                isSelected
                                                                    ? "text-[rgb(var(--mesa-warm-red))] font-medium"
                                                                    : "text-gray-600"
                                                            }`}
                                                        >
                                                            {value === 0 &&
                                                                "Not applicable"}
                                                            {value === 1 &&
                                                                "Very poor"}
                                                            {value === 2 &&
                                                                "Poor"}
                                                            {value === 3 &&
                                                                "Average"}
                                                            {value === 4 &&
                                                                "Good"}
                                                            {value === 5 &&
                                                                "Excellent"}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AwardScoreForm;
