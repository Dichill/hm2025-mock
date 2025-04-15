import { userClient } from "@/api/user-client";
import { UserProfileDto } from "../types/profile.dto";

export interface ProfileResponseDto {
    success: boolean;
    message: string;
    profile?: UserProfileDto;
}

/**
 * Get the authenticated user's own profile
 */
export async function getOwnProfile(): Promise<UserProfileDto> {
    try {
        const response = await userClient.get("/profile/me");
        return response.data;
    } catch (error) {
        console.error("Error fetching own profile:", error);
        throw error;
    }
}

/**
 * Get a specific user's profile by user ID (requires ORGANIZER role)
 */
export async function getUserProfile(userId: string): Promise<UserProfileDto> {
    try {
        const response = await userClient.get(`/profile/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}

/**
 * Update the authenticated user's profile
 */
export async function updateProfile(
    profileData: Partial<UserProfileDto>
): Promise<ProfileResponseDto> {
    try {
        const response = await userClient.patch("/profile", profileData);
        return response.data;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
}

/**
 * Delete the authenticated user's own profile
 */
export async function deleteOwnProfile(): Promise<ProfileResponseDto> {
    try {
        const response = await userClient.delete("/profile");
        return response.data;
    } catch (error) {
        console.error("Error deleting own profile:", error);
        throw error;
    }
}

/**
 * Delete a specific user's profile by user ID (requires ORGANIZER role)
 */
export async function deleteUserProfile(
    userId: string
): Promise<ProfileResponseDto> {
    try {
        const response = await userClient.delete(`/profile/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user profile:", error);
        throw error;
    }
}
