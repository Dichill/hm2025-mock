export interface UserProfileDto {
    id: string;
    user_id: string;
    full_name?: string;
    avatar_url?: string;
    school?: string;
    major?: string;
    year?: string;
    dietary_restrictions?: string;
    t_shirt_size?: string;
    linkedin_url?: string;
}

export interface ProfileResponseDto {
    success: boolean;
    message: string;
    profile?: UserProfileDto;
}

export interface QrCodeResponseDto {
    signedUrl: string | null;
}
