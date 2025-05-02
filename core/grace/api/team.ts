import { graceClient } from "@/api/grace-client";
import { Team, TeamMemberPublic, TeamWithMembers } from "../types/team.dto";

/**
 * Retrieves all teams
 * @returns Promise containing an array of Team objects
 */
export const getAllTeams = async (): Promise<Team[]> => {
    try {
        const response = await graceClient.get<Team[]>("/teams");
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a specific team by ID, including its members
 * @param id - Team ID to retrieve
 * @returns Promise containing a TeamWithMembers object
 */
export const getTeamById = async (id: string): Promise<TeamWithMembers> => {
    try {
        const response = await graceClient.get<TeamWithMembers>(`/teams/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Creates a new team and adds the creator as a member
 * @param name - Team name
 * @returns Promise containing the created Team object
 */
export const createTeam = async (name: string): Promise<Team> => {
    try {
        const response = await graceClient.post<Team>("/teams", { name });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Allows a user to join an existing team
 * @param id - Team ID to join
 * @returns Promise containing the TeamMember object
 */
export const joinTeam = async (id: string): Promise<TeamMemberPublic> => {
    try {
        const response = await graceClient.post<TeamMemberPublic>(
            `/teams/join/${id}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Allows a user to leave a team
 * @param id - Team ID to leave
 * @returns Promise containing success message
 */
export const leaveTeam = async (id: string): Promise<{ message: string }> => {
    try {
        const response = await graceClient.post<{ message: string }>(
            `/teams/leave/${id}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves all members of a specific team
 * @param teamId - Team ID to get members for
 * @returns Promise containing an array of TeamMemberPublic objects
 */
export const getTeamMembers = async (
    teamId: string
): Promise<TeamMemberPublic[]> => {
    try {
        const response = await graceClient.get<TeamMemberPublic[]>(
            `/teams/members/${teamId}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Updates a team member's role
 * @param teamId - Team ID
 * @param userId - User ID of the member to update
 * @param role - New role for the member
 * @returns Promise containing the updated TeamMember object
 */
export const updateTeamMember = async (
    teamId: string,
    userId: string,
    role: string
): Promise<TeamMemberPublic> => {
    try {
        const response = await graceClient.patch<TeamMemberPublic>(
            `/teams/members/${teamId}`,
            { userId, role }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
