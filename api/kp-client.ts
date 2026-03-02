import axios, { InternalAxiosRequestConfig } from "axios";
import supabase from "@/lib/supabase/supabase-client";
import { createMockAdapter } from "@/api/mock-adapter";
import { USE_DEMO_DATA } from "@/core/mock/demo-mode";

if (!process.env.NEXT_PUBLIC_APPLICATION_SERVICE_URL) {
    console.warn(
        "NEXT_PUBLIC_APPLICATION_SERVICE_URL environment variable is not defined"
    );
}

export const kickpostClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_KP_SERVICE_URL ?? "http://localhost:4001",
    headers: {
        "Content-Type": "application/json",
    },
    adapter: USE_DEMO_DATA ? createMockAdapter("kickpost") : undefined,
});

kickpostClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const { data: session } = await supabase.auth.getSession();
        const accessToken = session?.session?.access_token;

        if (accessToken && !config.headers.get("Authorization")) {
            config.headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return config;
    },
    (error: Error) => Promise.reject(error)
);
