import { useState, useEffect, useMemo, useCallback } from "react";
import {
    getAwardCategories,
    getScoredProjectsByJudge,
} from "@/core/grace/api/judge";
import { AwardCategory, ScoredProject } from "@/core/grace/types/judge.dto";

/**
 * Custom hook for loading and caching judge data including scored projects
 * and award categories
 *
 * @param judgeId The ID of the judge
 * @param round The judging round number
 * @returns Judge data, loading states, error states and refresh functions
 */
export const useJudgeData = (judgeId: string | undefined, round: number) => {
    const [judgedProjects, setJudgedProjects] = useState<ScoredProject[]>([]);
    const [awardCategories, setAwardCategories] = useState<AwardCategory[]>([]);
    const [loading, setLoading] = useState({
        projects: false,
        categories: false,
    });
    const [error, setError] = useState<string | null>(null);

    // Fetch all data once on component mount
    useEffect(() => {
        if (!judgeId) return;

        const loadAllData = async () => {
            setLoading({ projects: true, categories: true });
            setError(null);

            try {
                // Load both data sources in parallel
                const [projectsResult, categoriesResult] = await Promise.all([
                    getScoredProjectsByJudge(judgeId, round),
                    getAwardCategories(),
                ]);

                setJudgedProjects(projectsResult);
                setAwardCategories(categoriesResult);
            } catch (err) {
                console.error("Error loading judge data:", err);
                setError(
                    "Failed to load required data. Please refresh the page."
                );
            } finally {
                setLoading({ projects: false, categories: false });
            }
        };

        loadAllData();
    }, [judgeId, round]);

    // Create a lookup map for faster project checks
    const judgedProjectsMap = useMemo(() => {
        const map = new Map<string, ScoredProject>();
        judgedProjects.forEach((project) => {
            map.set(project.project_id, project);
        });
        return map;
    }, [judgedProjects]);

    // Create a map for award categories
    const awardCategoriesMap = useMemo(() => {
        const map = new Map<string, AwardCategory>();
        awardCategories.forEach((category) => {
            map.set(category.id, category);
        });
        return map;
    }, [awardCategories]);

    const refreshJudgedProjects = useCallback(async () => {
        if (!judgeId) return;

        setLoading((prev) => ({ ...prev, projects: true }));
        try {
            const refreshedProjects = await getScoredProjectsByJudge(
                judgeId,
                round
            );
            setJudgedProjects(refreshedProjects);
        } catch (err) {
            console.error("Error refreshing judged projects:", err);
            // Don't update error state on refresh to avoid affecting UI
        } finally {
            setLoading((prev) => ({ ...prev, projects: false }));
        }
    }, [judgeId, round]);

    return {
        judgedProjects,
        judgedProjectsMap,
        awardCategories,
        awardCategoriesMap,
        loading,
        error,
        refreshJudgedProjects,
    };
};

export default useJudgeData;
