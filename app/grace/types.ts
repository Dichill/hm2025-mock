/**
 * Interface for user data from Supabase authentication
 */
export interface User {
    id: string;
    email?: string;
    phone?: string;
    app_metadata: {
        provider?: string;
        [key: string]: unknown;
    };
    user_metadata: {
        first_name?: string;
        last_name?: string;
        avatar_url?: string;
        [key: string]: unknown;
    };
    aud: string;
    created_at: string;
    confirmed_at?: string;
    email_confirmed_at?: string;
    last_sign_in_at?: string;
    role?: string;
    updated_at?: string;
}

/**
 * Status of the dashboard verification
 */
export type DashboardStatus = "loading" | "authenticated" | "unauthenticated";

/**
 * Project judging status
 */
export type ProjectJudgingStatus = "NOT_JUDGED" | "IN_PROGRESS" | "JUDGED";

/**
 * Interface for project submission data
 */
export interface Project {
    id: string;
    name: string;
    description: string;
    team_id: string;
    team_name: string;
    team_members: TeamMember[];
    submitted_at: string;
    repository_url?: string;
    demo_url?: string;
    presentation_url?: string;
    tracks: string[];
    judging_status?: ProjectJudgingStatus;
    score?: number;
}

/**
 * Interface for team member data
 */
export interface TeamMember {
    id: string;
    name: string;
    email?: string;
}

/**
 * Interface for judging criteria
 */
export interface JudgingCriterion {
    id: string;
    name: string;
    description: string;
    max_score: number;
}

/**
 * Interface for judge's evaluation of a project
 */
export interface Evaluation {
    project_id: string;
    judge_id: string;
    criteria_scores: {
        [criterion_id: string]: number;
    };
    notes?: string;
    created_at: string;
    updated_at: string;
}
