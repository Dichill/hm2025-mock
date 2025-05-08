import { graceClient } from "@/api/grace-client";
import {
    AwardCategory,
    AwardScore,
    AwardWinner,
    RoundResult,
    Score,
    ScoredProject,
    SubmitAwardScoreRequest,
    SubmitScoreRequest,
    TopProject,
    TrackWinner,
} from "../types/judge.dto";

/**
 * Submit or update a score for a project in a specific round
 * @param scoreData Score data to submit
 * @returns The submitted/updated Score object
 */
export const submitProjectScore = async (
    scoreData: SubmitScoreRequest
): Promise<Score> => {
    const response = await graceClient.post<Score>("/scores", scoreData);
    return response.data;
};

/**
 * Submit or update a score for a specific award category
 * @param awardScoreData Award score data to submit
 * @returns The submitted/updated AwardScore object
 */
export const submitAwardScore = async (
    awardScoreData: SubmitAwardScoreRequest
): Promise<AwardScore> => {
    const response = await graceClient.post<AwardScore>(
        "/scores/award",
        awardScoreData
    );
    return response.data;
};

/**
 * Get all scores for a specific project and round
 * @param projectId Project UUID
 * @param round Judging round number (1 or 2)
 * @returns Array of Score objects
 */
export const getProjectScores = async (
    projectId: string,
    round: number
): Promise<Score[]> => {
    const response = await graceClient.get<Score[]>(
        `/scores/project/${projectId}`,
        {
            params: { round },
        }
    );
    return response.data;
};

/**
 * Get award scores for a specific project, optionally filtered by category
 * @param projectId Project UUID
 * @param category Optional award category name
 * @returns Array of AwardScore objects
 */
export const getProjectAwardScores = async (
    projectId: string,
    category?: string
): Promise<AwardScore[]> => {
    const response = await graceClient.get<AwardScore[]>(
        `/scores/award/project/${projectId}`,
        {
            params: category ? { category } : undefined,
        }
    );
    return response.data;
};

/**
 * Get all available award categories
 * @returns Array of AwardCategory objects
 */
export const getAwardCategories = async (): Promise<AwardCategory[]> => {
    const response = await graceClient.get<AwardCategory[]>(
        "/scores/award-categories"
    );
    return response.data;
};

/**
 * Get all projects scored by a specific judge in a given round
 * @param judgeId Judge UUID
 * @param round Judging round number (1 or 2)
 * @returns Array of ScoredProject objects with project details and scores
 */
export const getScoredProjectsByJudge = async (
    judgeId: string,
    round: number
): Promise<ScoredProject[]> => {
    const response = await graceClient.get<ScoredProject[]>(
        `/scores/judge/${judgeId}`,
        {
            params: { round },
        }
    );
    return response.data;
};

/**
 * Get aggregated results from Round 1 judging
 * @returns Array of RoundResult objects with average scores and rankings
 */
export const getRound1Results = async (): Promise<RoundResult[]> => {
    const response = await graceClient.get<RoundResult[]>(
        "/scores/round1-results"
    );
    return response.data;
};

/**
 * Get top N projects from Round 1 (for Round 2 selection)
 * @param count Number of top projects to retrieve (default: 10)
 * @returns Array of TopProject objects
 */
export const getTopProjects = async (count = 10): Promise<TopProject[]> => {
    const response = await graceClient.get<TopProject[]>(
        "/scores/top-projects",
        {
            params: { count },
        }
    );
    return response.data;
};

/**
 * Get aggregated results from Round 2 judging
 * @returns Array of RoundResult objects (same structure as Round 1)
 */
export const getRound2Results = async (): Promise<RoundResult[]> => {
    const response = await graceClient.get<RoundResult[]>(
        "/scores/round2-results"
    );
    return response.data;
};

/**
 * Get the winners for each track
 * @returns Array of TrackWinner objects
 */
export const getTrackWinners = async (): Promise<TrackWinner[]> => {
    const response = await graceClient.get<TrackWinner[]>(
        "/scores/track-winners"
    );
    return response.data;
};

/**
 * Get the winners for all award categories
 * @returns Array of AwardWinner objects
 */
export const getAwardWinners = async (): Promise<AwardWinner[]> => {
    const response = await graceClient.get<AwardWinner[]>(
        "/scores/award-winners"
    );
    return response.data;
};
