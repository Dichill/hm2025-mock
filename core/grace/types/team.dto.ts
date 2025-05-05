export interface Team {
    id: string;
    name: string;
    code: string;
    created_at: string;
}

export interface TeamMemberPublic {
    id: string;
    team_id: string;
    full_name: string;
    role: string;
    created_at: string;
}

export interface TeamMember extends TeamMemberPublic {
    user_id: string;
    email: string;
}

export interface TeamWithMembers extends Team {
    members: TeamMemberPublic[];
}

export interface JoinTeamByCodeDto {
    code: string;
}

export interface RemoveTeamMemberDto {
    userId: string;
}

export interface UpdateTeamMemberDto {
    userId: string;
    role: string;
}

export interface CreateTeamDto {
    name: string;
}

export interface MessageResponse {
    message: string;
}
