export interface EventResponseDto {
    id: string;
    title: string;
    description: string;
    start_time: Date;
    end_time: Date;
    location: string;
    event_type: string;
    thumbnail_url?: string;
    created_at: Date;
    updated_at: Date;
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

export interface EventRegistrationDto {
    eventId: string;
}
