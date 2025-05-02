export interface Setting {
    id: string;
    name: string;
    value: Record<string, unknown>;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface CreateSettingDto {
    name: string;
    value: Record<string, unknown>;
    description?: string;
}

export interface UpdateSettingDto {
    value: Record<string, unknown>;
    description?: string;
}
