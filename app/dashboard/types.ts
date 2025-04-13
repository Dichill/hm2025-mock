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
        full_name?: string;
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
 * Interface for user profile data stored in the profiles table
 */
export interface UserProfile {
    id: string;
    user_id: string;
    full_name?: string;
    avatar_url?: string;
    school?: string;
    major?: string;
    year?: string;
    dietary_restrictions?: string;
    t_shirt_size?: string;
    created_at: string;
    updated_at: string;
}

/**
 * Status of the dashboard verification
 */
export type DashboardStatus = "loading" | "authenticated" | "unauthenticated";
