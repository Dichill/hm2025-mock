// Types for request and response objects

export interface SubmitScoreRequest {
    judge_id: string;
    project_id: string;
    round: number;
    technical_complexity: number;
    potential_impact: number;
    design_implementation: number;
    presentation: number;
    bonus_scalability: boolean;
    bonus_all_participated: boolean;
    bonus_task_division: boolean;
}

export interface SubmitAwardScoreRequest {
    judge_id: string;
    project_id: string;
    award_category: string;
    score: number;
    notes?: string;
}

export interface Score {
    id: string;
    judge_id: string;
    project_id: string;
    round: number;
    technical_complexity: number;
    potential_impact: number;
    design_implementation: number;
    presentation: number;
    bonus_scalability: boolean;
    bonus_all_participated: boolean;
    bonus_task_division: boolean;
    created_at: string;
}

export interface AwardScore {
    id: string;
    judge_id: string;
    project_id: string;
    award_category: string;
    score: number;
    notes?: string;
    created_at: string;
}

export interface AwardCategory {
    id: string;
    name: string;
    description: string;
    created_at: string;
}

/**
 * Represents a judge with basic identification information
 */
export interface Judge {
    id: string;
    display_name: string;
    email: string;
}

export interface RoundResult {
    project_id: string;
    table_number: string;
    project_name: string;
    track: string | null;
    avg_technical: number;
    avg_impact: number;
    avg_design: number;
    avg_presentation: number;
    bonus_points: number;
    total_score: number;
    judge_count: number;
    judges: Judge[];
}

export interface TopProject {
    project_id: string;
    table_number: string;
    project_name: string;
    total_score: number;
}

export interface TrackWinner {
    track: string;
    project_id: string;
    project_name: string;
    table_number: string;
    total_score: number;
}

export interface AwardWinner {
    award_category: string;
    project_id: string;
    project_name: string;
    table_number: string;
    avg_score: number;
    judge_count: number;
}

/**
 * Represents a project scored by a specific judge
 */
export interface ScoredProject {
    score_id: string;
    project_id: string;
    project_name: string;
    table_number: string;
    track: string | null;
    technical_complexity: number;
    potential_impact: number;
    design_implementation: number;
    presentation: number;
    bonus_scalability: boolean;
    bonus_all_participated: boolean;
    bonus_task_division: boolean;
    created_at: string;
}
