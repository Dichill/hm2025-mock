import { userClient } from "@/api/user-client";
import { NotifyNonApplicantsResponse, StudentData } from "../types/admin.dto";
import {
    CreateEventDto,
    UpdateEventDto,
    EventRegistrationResponseDto,
} from "../types/admin.dto";
import { EventResponseDto } from "../types/event.dto";
import axios from "axios";

export async function getStudents(): Promise<StudentData[]> {
    try {
        const response = await userClient.get("/admin/students");
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
}

export async function notifyNonApplicants(): Promise<NotifyNonApplicantsResponse> {
    try {
        const response = await userClient.post("/admin/notify-non-applicants");
        return response.data;
    } catch (error) {
        console.error("Error notifying non-applicants:", error);
        throw error;
    }
}

/**
 * Interface for event response with registration count
 */
interface EventWithRegistrationCount extends EventResponseDto {
    registration_count: number;
}

/**
 * Creates a new event in the system.
 *
 * @param {CreateEventDto} eventData - The data for creating the new event
 * @returns {Promise<EventResponseDto>} The created event data
 * @throws {Error} If the request fails or returns an error status
 */
export async function createEvent(
    eventData: CreateEventDto
): Promise<EventResponseDto> {
    try {
        const response = await userClient.post("/admin/events", eventData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                throw new Error("Invalid event data provided");
            }
        }
        console.error("Error creating event:", error);
        throw error;
    }
}

/**
 * Updates an existing event's information.
 *
 * @param {string} eventId - The ID of the event to update
 * @param {UpdateEventDto} updateData - The data to update the event with
 * @returns {Promise<EventResponseDto>} The updated event data
 * @throws {Error} If the event is not found or the request fails
 */
export async function updateEvent(
    eventId: string,
    updateData: UpdateEventDto
): Promise<EventResponseDto> {
    try {
        const response = await userClient.patch(
            `/admin/events/${eventId}`,
            updateData
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error(`Event with ID ${eventId} not found`);
            } else if (error.response?.status === 400) {
                throw new Error("Invalid event update data");
            }
        }
        console.error("Error updating event:", error);
        throw error;
    }
}

/**
 * Deletes an event from the system.
 *
 * @param {string} eventId - The ID of the event to delete
 * @returns {Promise<void>} Empty promise on successful deletion
 * @throws {Error} If the event is not found or the request fails
 */
export async function deleteEvent(eventId: string): Promise<void> {
    try {
        await userClient.delete(`/admin/events/${eventId}`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error(`Event with ID ${eventId} not found`);
        }
        console.error("Error deleting event:", error);
        throw error;
    }
}

/**
 * Retrieves all events with their registration counts.
 *
 * @returns {Promise<EventWithRegistrationCount[]>} Array of events with registration counts
 * @throws {Error} If the request fails or returns an error status
 */
export async function getAllEventsWithRegistrationCounts(): Promise<
    EventWithRegistrationCount[]
> {
    try {
        const response = await userClient.get("/admin/events");
        return Array.isArray(response.data)
            ? response.data
            : response.data.data;
    } catch (error) {
        console.error("Error fetching events with registration counts:", error);
        throw error;
    }
}

/**
 * Retrieves all registrations for a specific event.
 *
 * @param {string} eventId - The ID of the event to get registrations for
 * @returns {Promise<EventRegistrationResponseDto[]>} Array of event registrations
 * @throws {Error} If the event is not found or the request fails
 */
export async function getEventRegistrations(
    eventId: string
): Promise<EventRegistrationResponseDto[]> {
    try {
        const response = await userClient.get(
            `/admin/events/${eventId}/registrations`
        );
        return Array.isArray(response.data)
            ? response.data
            : response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error(`Event with ID ${eventId} not found`);
        }
        console.error("Error fetching event registrations:", error);
        throw error;
    }
}
