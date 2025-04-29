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
