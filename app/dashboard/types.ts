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
 * Application status types for hackathon participants
 */
export type ApplicationStatus =
    | "NOT_APPLIED"
    | "SAVED"
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "WAITLISTED";
/**
 * Interface for application data
 */
export interface Application {
    id: string;
    user_id: string;
    status: ApplicationStatus;
    created_at: string;
    updated_at: string;
    applied_at?: string;
    decision_at?: string;
    application_data?: {
        resume_url?: string;
        github_url?: string;
        linkedin_url?: string;
        project_idea?: string;
        experience_level?: string;
        team_preference?: string;
        why_participate?: string;
        [key: string]: unknown;
    };
}
