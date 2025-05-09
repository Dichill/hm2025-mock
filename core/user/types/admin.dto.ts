import { EventResponseDto } from "./event.dto";

export interface StudentData {
    id: string;
    display_name: string;
    email: string;
}

export interface NotifyNonApplicantsResponse {
    success: boolean;
    notifiedCount: number;
    failedCount: number;
    errors?: string[];
}

export interface CreateEventDto {
    title: string;
    description: string;
    start_time: Date;
    end_time: Date;
    location: string;
    event_type: string;
    thumbnail_url?: string;
}

export interface UpdateEventDto {
    title?: string;
    description?: string;
    start_time?: Date;
    end_time?: Date;
    location?: string;
    event_type?: string;
    thumbnail_url?: string;
}

export interface EventRegistrationResponseDto {
    user_id: string;
    display_name: string;
    email: string;
    registered_at: Date;
    event: EventResponseDto;
}

export interface CreateStudentDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface CreateStudentResponseDto {
    userId: string;
    email: string;
    token: string;
    role: string;
    message: string;
}

export interface DeleteUserDto {
    userId: string;
}

export interface DeleteUserResponseDto {
    success: boolean;
    message: string;
}

export interface UserCheckinStatusDto {
    id: string;
    user_id: string;
    full_name: string;
    avatar_url: string;
    school: string;
    major: string;
    year: string;
    dietary_restrictions: string;
    t_shirt_size: string;
    is_approved: boolean;
    day_one: boolean;
    day_two: boolean;
    created_at: string;
    updated_at: string;
}
