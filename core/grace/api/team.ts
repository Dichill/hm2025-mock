import { graceClient } from "@/api/grace-client";
import {
    CreateTeamDto,
    JoinTeamByCodeDto,
    MessageResponse,
    RemoveTeamMemberDto,
    Team,
    TeamMemberPublic,
    TeamWithMembers,
    UpdateTeamMemberDto,
} from "../types/team.dto";

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
 * @returns Promise containing the created Team object with auto-generated code
 */
export const createTeam = async (name: string): Promise<Team> => {
    try {
        const response = await graceClient.post<Team>("/teams", {
            name,
        } as CreateTeamDto);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Joins a team using the provided join code
 * @param code - The team join code
 * @returns Promise containing the team membership object
 */
export const joinTeamByCode = async (
    code: string
): Promise<TeamMemberPublic> => {
    try {
        const response = await graceClient.post<TeamMemberPublic>(
            "/teams/join-by-code",
            { code } as JoinTeamByCodeDto
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves the current user's team with members
 * @returns Promise containing the user's team with members, or null if not in a team
 */
export const getMyTeam = async (): Promise<TeamWithMembers | null> => {
    try {
        const response = await graceClient.get<TeamWithMembers | null>(
            "/teams/my-team"
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
export const leaveTeam = async (id: string): Promise<MessageResponse> => {
    try {
        const response = await graceClient.post<MessageResponse>(
            `/teams/leave/${id}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Removes a team member
 * @param teamId - Team ID
 * @param userId - User ID of the member to remove
 * @returns Promise containing success message
 */
export const removeTeamMember = async (
    teamId: string,
    userId: string
): Promise<MessageResponse> => {
    try {
        const response = await graceClient.delete<MessageResponse>(
            `/teams/members/${teamId}`,
            {
                data: { userId } as RemoveTeamMemberDto,
            }
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
            { userId, role } as UpdateTeamMemberDto
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
