import { userClient } from "@/api/user-client";
import { RegisterDto } from "../types/register.dto";
import { StatsResponse, UserDataResponse } from "../types/user.dto";

export interface RegisterResponseDto {
    message: string;
    token?: string;
}

export interface ResendCodeResponseDto {
    success: boolean;
    message: string;
}

export async function register(
    registerDto: RegisterDto
): Promise<RegisterResponseDto> {
    const response = await userClient.post("/auth/register", registerDto);
    return response.data;
}

export async function verifyUserEmail(
    token: string,
    code: string
): Promise<boolean> {
    try {
        const response = await userClient.post(
            "/auth/verify",
            { code },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.verified;
    } catch (error) {
        console.error("Error verifying email:", error);
        throw error;
    }
}

export async function resendVerificationCode(
    email?: string
): Promise<ResendCodeResponseDto> {
    const response = await userClient.post("/auth/resend-verification", {
        email,
    });
    return response.data;
}

export async function getUserData(): Promise<UserDataResponse> {
    try {
        const response = await userClient.get("/auth/data");
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

export async function getStats(): Promise<StatsResponse> {
    try {
        const response = await userClient.get("/auth/stats");
        return response.data;
    } catch (error) {
        console.error("Error fetching stats:", error);
        throw error;
    }
}
