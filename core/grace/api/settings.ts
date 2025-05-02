import { graceClient } from "@/api/grace-client";
import {
    Setting,
    CreateSettingDto,
    UpdateSettingDto,
} from "../types/settings.dto";

/**
 * Admin API endpoints for settings management
 * All endpoints require authentication with ORGANIZER role
 */
export const adminSettingsApi = {
    /**
     * Retrieves all settings in the system
     * @returns Promise with array of Setting objects
     */
    getAll: async (): Promise<Setting[]> => {
        try {
            const response = await graceClient.get<Setting[]>(
                "/admin/settings"
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching all settings:", error);
            throw error;
        }
    },

    /**
     * Retrieves a specific setting by its name
     * @param name - Name of the setting to retrieve
     * @returns Promise with Setting object
     */
    getByName: async (name: string): Promise<Setting> => {
        if (!name || typeof name !== "string") {
            throw new Error("Valid setting name is required");
        }

        try {
            const response = await graceClient.get<Setting>(
                `/admin/settings/${name}`
            );
            return response.data;
        } catch (error) {
            console.error(`Error fetching setting with name ${name}:`, error);
            throw error;
        }
    },

    /**
     * Creates a new setting
     * @param createSettingDto - Data for creating new setting
     * @returns Promise with the created Setting object
     */
    create: async (createSettingDto: CreateSettingDto): Promise<Setting> => {
        if (!createSettingDto.name || !createSettingDto.value) {
            throw new Error("Setting name and value are required");
        }

        try {
            const response = await graceClient.post<Setting>(
                "/admin/settings",
                createSettingDto
            );
            return response.data;
        } catch (error) {
            console.error("Error creating setting:", error);
            throw error;
        }
    },

    /**
     * Updates an existing setting by name
     * @param name - Name of the setting to update
     * @param updateSettingDto - Data for updating the setting
     * @returns Promise with the updated Setting object
     */
    update: async (
        name: string,
        updateSettingDto: UpdateSettingDto
    ): Promise<Setting> => {
        if (!name || typeof name !== "string") {
            throw new Error("Valid setting name is required");
        }

        if (!updateSettingDto.value) {
            throw new Error("Setting value is required for update");
        }

        try {
            const response = await graceClient.patch<Setting>(
                `/admin/settings/${name}`,
                updateSettingDto
            );
            return response.data;
        } catch (error) {
            console.error(`Error updating setting with name ${name}:`, error);
            throw error;
        }
    },
};

/**
 * Public API endpoints for settings access
 * These endpoints do not require authentication
 */
export const publicSettingsApi = {
    /**
     * Retrieves all public settings
     * @returns Promise with array of Setting objects
     */
    getAll: async (): Promise<Setting[]> => {
        try {
            const response = await graceClient.get<Setting[]>("/settings");
            return response.data;
        } catch (error) {
            console.error("Error fetching all public settings:", error);
            throw error;
        }
    },

    /**
     * Retrieves a specific public setting by its name
     * @param name - Name of the setting to retrieve
     * @returns Promise with Setting object
     */
    getByName: async (name: string): Promise<Setting> => {
        if (!name || typeof name !== "string") {
            throw new Error("Valid setting name is required");
        }

        try {
            const response = await graceClient.get<Setting>(
                `/settings/${name}`
            );
            return response.data;
        } catch (error) {
            console.error(
                `Error fetching public setting with name ${name}:`,
                error
            );
            throw error;
        }
    },
};
