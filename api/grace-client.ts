import axios, { InternalAxiosRequestConfig } from "axios";
import { AuthResponse, VerifyJudgeCodeDto } from "@/core/grace/types/judge.dto";
import Cookies from "js-cookie";
import supabase from "@/lib/supabase/supabase-client";

if (!process.env.NEXT_PUBLIC_GRACE_SERVICE_URL) {
    console.warn(
        "NEXT_PUBLIC_GRACE_SERVICE_URL environment variable is not defined"
    );
}

// Cookie name for storing the auth token
const AUTH_TOKEN_COOKIE = "grace_auth_token";
const AUTH_DATA_COOKIE = "grace_auth_data";

// Cookie options
const COOKIE_OPTIONS = {
    expires: 1, // 1 day
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
};

// Initialize cookies with proper type
let cookiesInstance: typeof Cookies | null = null;

// Initialize on client-side only
if (typeof window !== "undefined") {
    cookiesInstance = Cookies;
}

export const graceClient = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_GRACE_SERVICE_URL! ?? "http://localhost:4002",
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Checks if user is logged in through Supabase
 * @returns Promise<boolean> indicating if user is authenticated through Supabase
 */
export const isSupabaseAuthenticated = async (): Promise<boolean> => {
    try {
        const { data } = await supabase.auth.getSession();
        return !!data.session;
    } catch (error) {
        console.error("Error checking Supabase session:", error);
        return false;
    }
};

/**
 * Clears Grace authentication tokens if user is logged in through Supabase
 */
export const checkAndClearGraceAuth = async (): Promise<void> => {
    try {
        const isLoggedInWithSupabase = await isSupabaseAuthenticated();

        if (isLoggedInWithSupabase && cookiesInstance) {
            // User is logged in through Supabase, clear Grace auth tokens
            cookiesInstance.remove(AUTH_TOKEN_COOKIE, { path: "/" });
            cookiesInstance.remove(AUTH_DATA_COOKIE, { path: "/" });
        }
    } catch (error) {
        console.error("Error during auth check:", error);
    }
};

/**
 * Authenticates a judge using their judge code
 * @param judgeCode - The unique code assigned to the judge
 * @returns Promise with the authentication response containing JWT token
 */
export const authenticateJudge = async (
    judgeCode: string
): Promise<AuthResponse> => {
    try {
        // Check if user is already authenticated with Supabase
        // If so, clear any existing Grace auth tokens
        await checkAndClearGraceAuth();

        const response = await graceClient.post<AuthResponse>(
            "/auth/verify-judge-code",
            {
                judgeCode,
            } as VerifyJudgeCodeDto
        );

        // Store the token in a cookie for persistence
        if (cookiesInstance) {
            cookiesInstance.set(
                AUTH_TOKEN_COOKIE,
                response.data.token,
                COOKIE_OPTIONS
            );
            cookiesInstance.set(
                AUTH_DATA_COOKIE,
                JSON.stringify(response.data),
                COOKIE_OPTIONS
            );
        }

        return response.data;
    } catch (error) {
        console.error("Judge authentication failed:", error);
        throw error;
    }
};

/**
 * Clears the stored authentication token
 */
export const logout = (): void => {
    if (cookiesInstance) {
        cookiesInstance.remove(AUTH_TOKEN_COOKIE, { path: "/" });
        cookiesInstance.remove(AUTH_DATA_COOKIE, { path: "/" });
    }
};

/**
 * Gets the current authentication status
 * @returns Boolean indicating if a user is authenticated
 */
export const isAuthenticated = (): boolean => {
    if (!cookiesInstance) return false;
    return !!cookiesInstance.get(AUTH_TOKEN_COOKIE);
};

/**
 * Gets the current auth data if available
 * @returns The stored auth data or null if not authenticated
 */
export const getAuthData = (): AuthResponse | null => {
    if (!cookiesInstance) return null;

    const authDataStr = cookiesInstance.get(AUTH_DATA_COOKIE);
    if (!authDataStr) return null;

    try {
        return JSON.parse(authDataStr);
    } catch (error) {
        console.error("Failed to parse auth data:", error);
        return null;
    }
};

graceClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        try {
            const isLoggedInWithSupabase = await isSupabaseAuthenticated();

            if (isLoggedInWithSupabase) {
                const { data: session } = await supabase.auth.getSession();
                const supabaseToken = session?.session?.access_token;

                if (supabaseToken && !config.headers.get("Authorization")) {
                    config.headers.set(
                        "Authorization",
                        `Bearer ${supabaseToken}`
                    );
                    return config;
                }

                if (cookiesInstance) {
                    cookiesInstance.remove(AUTH_TOKEN_COOKIE, { path: "/" });
                    cookiesInstance.remove(AUTH_DATA_COOKIE, { path: "/" });
                }
            }

            const token = cookiesInstance?.get(AUTH_TOKEN_COOKIE);

            if (token && !config.headers.get("Authorization")) {
                config.headers.set("Authorization", `Bearer ${token}`);
            }

            return config;
        } catch (error) {
            console.error("Error in Grace client interceptor:", error);
            return config;
        }
    },
    (error: Error) => Promise.reject(error)
);
