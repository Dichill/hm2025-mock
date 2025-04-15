export interface UserProfile {
    id: string;
    user_id: string;
    first_name?: string;
    last_name?: string;
    display_name?: string;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
    [key: string]: string | undefined;
}

export interface UserDataResponse {
    userId: string;
    email: string;
    roles: string[];
    profile?: UserProfile;
    emailConfirmed: boolean;
}

export interface SupabaseUserResponse {
    user: {
        id: string;
        email?: string;
        email_confirmed_at?: string;
    };
}

export interface StatsResponse {
    totalUsers: number;
    totalApplications: number;
    lastUpdated: string;
}
