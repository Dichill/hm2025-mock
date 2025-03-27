import axios, { InternalAxiosRequestConfig } from "axios";
import supabase from "@/lib/supabase/supabase-client";

if (!process.env.NEXT_PUBLIC_RFID_SERVICE_URL) {
    throw new Error(
        "NEXT_PUBLIC_RFID_SERVICE_URL environment variable is not defined"
    );
}

export const userClient = axios.create({
    baseURL: "/api/user",
    headers: {
        "Content-Type": "application/json",
    },
});

userClient.interceptors.request.use(
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
