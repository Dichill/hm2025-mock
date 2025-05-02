export interface VerifyJudgeCodeDto {
    judgeCode: string;
}

export interface AuthResponse {
    token: string;
    userId: string;
    type: string;
    sponsorTag?: string;
}

export interface Project {
    projectId: string;
    name: string;
    description: string;
    tableNumber: number;
    track?: string;
    teamMembers?: string[];
    githubUrl?: string;
    demoUrl?: string;
    technologies?: string[];
}

export interface CreateScoreDto {
    projectId: string;
    tableNumber: number;
    technicalComplexity: number;
    userExperience: number;
    originality: number;
    overallImpression: number;
    comments?: string;
}

export interface ScoreResponse {
    id: string;
    projectId: string;
    judgeId: string;
    judgeType: string;
    sponsorTag?: string;
    technicalComplexity: number;
    userExperience: number;
    originality: number;
    overallImpression: number;
    average: number;
    comments?: string;
    createdAt: string;
}

export interface RankedProject {
    projectId: string;
    name: string;
    description: string;
    tableNumber: number;
    track?: string;
    averageScore: number;
    rank: number;
}

export interface ProjectRanking {
    rank: number;
    totalProjects: number;
}

export interface RequestWaitlistDto {
    tableNumber: number;
    projectId?: string;
    notes?: string;
}

export interface MarkDoneDto {
    tableNumber: number;
    sponsorTag: string;
    feedback?: string;
}

export interface WaitlistEntry {
    id: string;
    tableNumber: number;
    projectId?: string;
    sponsorTag: string;
    notes?: string;
    isJudged: boolean;
    feedback?: string;
    requestedAt: string;
    judgedAt?: string;
}
