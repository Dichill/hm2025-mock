"use client";

import React, { useState, useEffect } from "react";
import { ProjectApi } from "@/core/grace/api/project";
import {
    submitProjectScore,
    submitAwardScore,
    getProjectAwardScores,
} from "@/core/grace/api/judge";
import {
    SubmitScoreRequest,
    SubmitAwardScoreRequest,
    ScoredProject,
} from "@/core/grace/types/judge.dto";
import { Project } from "@/core/grace/types/project.dto";

// Import components and hooks from index file
import {
    useUser,
    useJudgeData,
    MessageAlert,
    JudgeTab,
    HistoryTab,
    MainScoreState,
} from "./judging";
import { useSettings } from "@/app/context/SettingsContext";

// Tab type definition
type Tab = "judge" | "history";

/**
 * Main judging interface component for scoring hackathon projects
 */
const JudgingInterface: React.FC = () => {
    const { user } = useUser();
    const { round2JudgingEnabled } = useSettings();
    const judgeId = user?.id;
    const round = round2JudgingEnabled ? 2 : 1; // Set round based on settings

    // UI state
    const [activeTab, setActiveTab] = useState<Tab>("judge");
    const [tableNumber, setTableNumber] = useState("");
    const [findingProject, setFindingProject] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [project, setProject] = useState<Project | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState<{
        text: string;
        type: "success" | "error";
    } | null>(null);

    // Load judge data with the custom hook
    const {
        judgedProjects,
        judgedProjectsMap,
        awardCategories,
        loading: dataLoading,
        error: dataError,
        refreshJudgedProjects,
    } = useJudgeData(judgeId, round);

    // Score state
    const [mainScore, setMainScore] = useState<MainScoreState>({
        technical_complexity: 0,
        potential_impact: 0,
        design_implementation: 0,
        presentation: 0,
        bonus_scalability: false,
        bonus_all_participated: false,
        bonus_task_division: false,
    });

    // Derived from award categories data
    const [awardScores, setAwardScores] = useState<Record<string, number>>({});

    // Update award scores when categories change
    useEffect(() => {
        if (awardCategories.length > 0) {
            const initialScores: Record<string, number> = {};
            awardCategories.forEach((cat) => {
                initialScores[cat.name] = 0;
            });
            setAwardScores(initialScores);
        }
    }, [awardCategories]);

    // Helper function to show messages
    const showMessage = (text: string, type: "success" | "error") => {
        setMessage({ text, type });
        // Auto-dismiss after 5 seconds
        setTimeout(() => setMessage(null), 5000);
    };

    // Function to load project scores for editing
    const loadProjectScores = (scoredProject: ScoredProject) => {
        setIsEditing(true);

        // Set scores from the judged project
        setMainScore({
            technical_complexity: scoredProject.technical_complexity,
            potential_impact: scoredProject.potential_impact,
            design_implementation: scoredProject.design_implementation,
            presentation: scoredProject.presentation,
            bonus_scalability: scoredProject.bonus_scalability,
            bonus_all_participated: scoredProject.bonus_all_participated,
            bonus_task_division: scoredProject.bonus_task_division,
        });

        // Load the full project details and award scores
        setFindingProject(true);

        Promise.all([
            ProjectApi.getProjectById(scoredProject.project_id),
            getProjectAwardScores(scoredProject.project_id),
        ])
            .then(([projectData, awardScoresData]) => {
                setProject(projectData);

                // Set award scores from previously submitted data
                if (awardScoresData.length > 0) {
                    const previousAwardScores: Record<string, number> = {};
                    awardScoresData.forEach((awardScore) => {
                        // Use the award category ID directly since that's what's in the response
                        previousAwardScores[awardScore.award_category] =
                            awardScore.score;
                    });
                    setAwardScores(previousAwardScores);
                }

                showMessage(`Editing: ${projectData.name}`, "success");

                // Switch to the judge tab
                setActiveTab("judge");
            })
            .catch((error) => {
                console.error("Error loading project for editing:", error);
                showMessage("Failed to load project for editing", "error");
            })
            .finally(() => {
                setFindingProject(false);
            });
    };

    // Function to find a project by table number
    const handleFindProject = async () => {
        if (!tableNumber) {
            showMessage(
                "Please enter a table number to find a project",
                "error"
            );
            return;
        }

        setFindingProject(true);
        try {
            const projectData = await ProjectApi.getProjectByTableNumber(
                tableNumber
            );
            if (!projectData) {
                showMessage(
                    `No project found at table ${tableNumber}`,
                    "error"
                );
                setProject(null);
            } else {
                setProject(projectData);

                // Check if the project has already been judged using the map for O(1) lookup
                const alreadyJudged = judgedProjectsMap.get(projectData.id);

                if (alreadyJudged) {
                    // Pre-fill the form with existing scores
                    setMainScore({
                        technical_complexity:
                            alreadyJudged.technical_complexity,
                        potential_impact: alreadyJudged.potential_impact,
                        design_implementation:
                            alreadyJudged.design_implementation,
                        presentation: alreadyJudged.presentation,
                        bonus_scalability: alreadyJudged.bonus_scalability,
                        bonus_all_participated:
                            alreadyJudged.bonus_all_participated,
                        bonus_task_division: alreadyJudged.bonus_task_division,
                    });

                    // Load previously submitted award scores
                    getProjectAwardScores(projectData.id)
                        .then((awardScoresData) => {
                            if (awardScoresData.length > 0) {
                                const previousAwardScores: Record<
                                    string,
                                    number
                                > = {};
                                awardScoresData.forEach((awardScore) => {
                                    // Use the award category ID directly since that's what's in the response
                                    previousAwardScores[
                                        awardScore.award_category
                                    ] = awardScore.score;
                                });
                                setAwardScores(previousAwardScores);
                            }
                        })
                        .catch((error) => {
                            console.error("Error loading award scores:", error);
                        });

                    setIsEditing(true);
                    showMessage(
                        `You've already judged ${projectData.name}. You can edit your scores.`,
                        "success"
                    );
                } else {
                    // Reset form for new judging
                    setMainScore({
                        technical_complexity: 0,
                        potential_impact: 0,
                        design_implementation: 0,
                        presentation: 0,
                        bonus_scalability: false,
                        bonus_all_participated: false,
                        bonus_task_division: false,
                    });

                    // Reset award scores for new project
                    const resetScores: Record<string, number> = {};
                    awardCategories.forEach((cat) => {
                        resetScores[cat.name] = 0;
                    });
                    setAwardScores(resetScores);

                    setIsEditing(false);
                    showMessage(`Found: ${projectData.name}`, "success");
                }
            }
        } catch (error) {
            console.error("Error finding project:", error);
            showMessage("Failed to find project. Please try again.", "error");
        } finally {
            setFindingProject(false);
        }
    };

    // Handler for slider changes
    const handleSliderChange = (name: string, value: number) => {
        setMainScore((prev) => ({ ...prev, [name]: value }));
    };

    // Handler for checkbox changes
    const handleCheckboxChange = (name: string, checked: boolean) => {
        setMainScore((prev) => ({ ...prev, [name]: checked }));
    };

    // Handler for award score changes
    const handleAwardScoreChange = (categoryName: string, score: number) => {
        setAwardScores((prev) => ({ ...prev, [categoryName]: score }));
    };

    // Handler for score submission
    const handleSubmit = async () => {
        if (!project || !judgeId) {
            showMessage("Missing project or judge information", "error");
            return;
        }

        setSubmitting(true);
        try {
            // Submit main score
            const scoreRequest: SubmitScoreRequest = {
                judge_id: judgeId,
                project_id: project.id,
                round,
                ...mainScore,
            };
            await submitProjectScore(scoreRequest);

            // Submit award scores if project opted for awards
            if (project.awards_opt_in && project.awards_opt_in.length > 0) {
                // Submit all award scores for eligible categories
                const awardPromises = Object.entries(awardScores).map(
                    ([categoryName, score]) => {
                        const awardRequest: SubmitAwardScoreRequest = {
                            judge_id: judgeId,
                            project_id: project.id,
                            award_category: categoryName,
                            score,
                        };
                        return submitAwardScore(awardRequest);
                    }
                );

                if (awardPromises.length > 0) {
                    await Promise.all(awardPromises);
                }
            }

            showMessage(
                isEditing
                    ? "Your updated scores have been submitted successfully."
                    : "Your scores for the project have been submitted successfully.",
                "success"
            );

            // Refresh the judged projects list
            await refreshJudgedProjects();

            // Reset form for next entry
            setProject(null);
            setTableNumber("");
            setIsEditing(false);
            setMainScore({
                technical_complexity: 0,
                potential_impact: 0,
                design_implementation: 0,
                presentation: 0,
                bonus_scalability: false,
                bonus_all_participated: false,
                bonus_task_division: false,
            });

            // Reset award scores
            const resetScores: Record<string, number> = {};
            awardCategories.forEach((cat) => {
                resetScores[cat.name] = 0;
            });
            setAwardScores(resetScores);
        } catch (error) {
            console.error("Error submitting scores:", error);
            showMessage("Failed to submit scores. Please try again.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    // UI helper to show loading state
    const isLoading =
        dataLoading.projects || dataLoading.categories || findingProject;

    return (
        <div className="container mx-auto px-4 py-6 max-w-4xl">
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-[rgb(var(--mesa-warm-red))]">
                    JUDGE MESA
                </h1>
                <p className="text-gray-600 mt-2">
                    {round === 2
                        ? "Final Round: Score and Review HACKMESA Finalist Projects!"
                        : "Score and Review HACKMESA Projects!"}
                </p>
                {round === 2 && (
                    <p className="text-sm text-[rgb(var(--mesa-purple))] mt-2">
                        You are now judging the final round. Only the top
                        projects from round 1 are available.
                    </p>
                )}
            </div>

            {message && (
                <MessageAlert
                    text={message.text}
                    type={message.type}
                    onDismiss={() => setMessage(null)}
                />
            )}

            {dataError && <MessageAlert text={dataError} type="error" />}

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
                <button
                    className={`px-4 py-2 font-medium text-sm ${
                        activeTab === "judge"
                            ? "text-[rgb(var(--mesa-purple))] border-b-2 border-[rgb(var(--mesa-purple))]"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("judge")}
                >
                    Judge Projects
                </button>
                <button
                    className={`px-4 py-2 font-medium text-sm ${
                        activeTab === "history"
                            ? "text-[rgb(var(--mesa-purple))] border-b-2 border-[rgb(var(--mesa-purple))]"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("history")}
                >
                    Judging History
                </button>
            </div>

            {/* Judge Tab Content */}
            {activeTab === "judge" && (
                <JudgeTab
                    project={project}
                    isEditing={isEditing}
                    tableNumber={tableNumber}
                    setTableNumber={setTableNumber}
                    findingProject={findingProject}
                    submitting={submitting}
                    mainScore={mainScore}
                    awardScores={awardScores}
                    awardCategories={awardCategories}
                    handleFindProject={handleFindProject}
                    handleSliderChange={handleSliderChange}
                    handleCheckboxChange={handleCheckboxChange}
                    handleAwardScoreChange={handleAwardScoreChange}
                    handleSubmit={handleSubmit}
                />
            )}

            {/* History Tab Content */}
            {activeTab === "history" && (
                <HistoryTab
                    judgedProjects={judgedProjects}
                    isLoading={isLoading}
                    error={dataError}
                    round={round}
                    onEditScore={loadProjectScores}
                />
            )}
        </div>
    );
};

export default JudgingInterface;
