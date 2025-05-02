export interface Team {
    id: string;
    name: string;
    created_at: string;
}

export interface TeamMemberPublic {
    id: string;
    team_id: string;
    full_name: string;
    role: string;
    created_at: string;
}

export interface TeamWithMembers extends Team {
    members: TeamMemberPublic[];
}
