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
};
