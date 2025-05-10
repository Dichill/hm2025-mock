import { graceClient } from "@/api/grace-client";
import { CreateProjectDto, Project } from "@/core/grace/types/project.dto";
import { AxiosError } from "axios";

/**
 * Project API client
 * Contains methods for interacting with project-related endpoints
 */
export const ProjectApi = {
    /**
     * Gets all projects
     * @returns Promise with array of Project objects
     * @throws Error if the request fails
     */
    getAllProjects: async (): Promise<Project[]> => {
        try {
            const response = await graceClient.get<Project[]>("/projects");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            throw error;
        }
    },

    /**
     * Gets a project by its ID
     * @param id - The project ID
     * @returns Promise with the Project object
     * @throws Error if the request fails or project is not found
     */
    getProjectById: async (id: string): Promise<Project> => {
        try {
            const response = await graceClient.get<Project>(`/projects/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch project with ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Gets a project by its team ID
     * @param teamId - The team ID
     * @returns Promise with the Project object or null if not found
     * @throws Error if the request fails
     */
    getProjectByTeamId: async (teamId: string): Promise<Project | null> => {
        try {
            const response = await graceClient.get<Project>(
                `/projects/team/${teamId}`
            );
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 404) {
                return null;
            }
            console.error(`Failed to fetch project for team ${teamId}:`, error);
            throw error;
        }
    },

    /**
     * Gets a project by its table number
     * @param tableNumber - The table number
     * @returns Promise with the Project object or null if not found
     * @throws Error if the request fails
     */
    getProjectByTableNumber: async (
        tableNumber: string
    ): Promise<Project | null> => {
        try {
            const response = await graceClient.get<Project>(
                `/projects/table/${tableNumber}`
            );
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 404) {
                return null;
            }
            console.error(
                `Failed to fetch project at table ${tableNumber}:`,
                error
            );
            throw error;
        }
    },

    /**
     * Checks if a table number is available (not assigned to any project)
     * @param tableNumber - The table number to check
     * @param currentProjectId - Optional ID of the current project (for update operations)
     * @returns Promise with boolean indicating if the table number is available
     */
    isTableNumberAvailable: async (
        tableNumber: string,
        currentProjectId?: string
    ): Promise<boolean> => {
        try {
            // Trim the table number to match backend behavior
            const trimmedTableNumber = tableNumber.trim();

            // If empty, it's not valid
            if (!trimmedTableNumber) {
                return false;
            }

            const project = await ProjectApi.getProjectByTableNumber(
                trimmedTableNumber
            );

            // Table number is available if no project is found
            if (!project) {
                return true;
            }

            // If updating a project, the table number is available if it belongs to the current project
            if (currentProjectId && project.id === currentProjectId) {
                return true;
            }

            // Otherwise, table number is already taken
            return false;
        } catch (error) {
            console.error(`Failed to check table number availability:`, error);
            // Default to false on error to be safe
            return false;
        }
    },

    /**
     * Creates a new project
     * @param projectData - Data needed to create a project
     * @returns Promise with the created Project object
     * @throws Error if the request fails
     */
    createProject: async (projectData: CreateProjectDto): Promise<Project> => {
        try {
            const response = await graceClient.post<Project>(
                "/projects",
                projectData
            );
            return response.data;
        } catch (error) {
            console.error("Failed to create project:", error);
            throw error;
        }
    },

    /**
     * Updates an existing project
     * @param id - The project ID to update
     * @param projectData - New project data
     * @returns Promise with the updated Project object
     * @throws Error if the request fails
     */
    updateProject: async (
        id: string,
        projectData: CreateProjectDto
    ): Promise<Project> => {
        try {
            const response = await graceClient.put<Project>(
                `/projects/${id}`,
                projectData
            );
            return response.data;
        } catch (error) {
            console.error(`Failed to update project with ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Gets projects grouped by sponsor opt-ins with minimal information (name and table number)
     * @returns Promise with object where keys are sponsor names and values are arrays of minimal project info
     * @throws Error if the request fails or user doesn't have required role
     */
    getProjectsBySponsorOptIns: async (): Promise<
        Record<string, { name: string; table_number: string }[]>
    > => {
        try {
            const response = await graceClient.get<
                Record<string, { name: string; table_number: string }[]>
            >("/projects/sponsor-opt-ins");
            return response.data;
        } catch (error) {
            console.error(
                "Failed to fetch projects by sponsor opt-ins:",
                error
            );
            throw error;
        }
    },

    /**
     * Gets complete project information grouped by sponsor opt-ins
     * @returns Promise with object where keys are sponsor names and values are arrays of complete Project objects
     * @throws Error if the request fails or user doesn't have required role
     */
    getCompleteProjectsBySponsor: async (): Promise<
        Record<string, Project[]>
    > => {
        try {
            const response = await graceClient.get<Record<string, Project[]>>(
                "/projects/sponsors/projects"
            );
            return response.data;
        } catch (error) {
            console.error(
                "Failed to fetch complete projects by sponsor:",
                error
            );
            throw error;
        }
    },
};
