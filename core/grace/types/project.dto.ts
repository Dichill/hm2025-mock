/**
 * Project and related data transfer objects for the Grace API
 */

/**
 * Represents a project in the system
 */
export interface Project {
    id: string;
    team_id: string;
    name: string;
    table_number: string;
    devpost_url: string;
    awards_opt_in: string[];
    track: string;
    sponsor_opt_in: string[];
    created_by: string;
    created_at: string;
}

/**
 * Data required to create a new project
 */
export interface CreateProjectDto {
    team_id: string;
    name: string;
    table_number: string;
    devpost_url: string;
    awards_opt_in: string[];
    track: string;
    sponsor_opt_in: string[];
    created_by?: string; // Optional, will be set from authenticated user if not provided
}
