import { userClient } from "@/api/user-client";
import { EventResponseDto, EventRegistrationDto } from "../types/event.dto";
import axios from "axios";

/**
 * Retrieves all events available in the system.
 *
 * @returns {Promise<EventResponseDto[]>} Array of event objects
 * @throws {Error} If the request fails or returns an error status
 */
export async function getAllEvents(): Promise<EventResponseDto[]> {
    try {
        const response = await userClient.get("/events");
        // Check if the response is an array directly or nested in a data property
        return Array.isArray(response.data)
            ? response.data
            : response.data.data;
    } catch (error) {
        console.error("Error fetching all events:", error);
        throw error;
    }
}

/**
 * Retrieves a specific event by its ID.
 *
 * @param {string} eventId - The unique identifier of the event
 * @returns {Promise<EventResponseDto>} The event object
 * @throws {Error} If the event is not found or the request fails
 */
export async function getEventById(eventId: string): Promise<EventResponseDto> {
    try {
        const response = await userClient.get(`/events/${eventId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error(`Event with ID ${eventId} not found`);
        }
        console.error("Error fetching event by ID:", error);
        throw error;
    }
}

/**
 * Registers the current user for an event.
 *
 * @param {EventRegistrationDto} registrationData - The event registration data
 * @returns {Promise<void>} Empty promise on successful registration
 * @throws {Error} If registration fails or returns an error status
 */
export async function registerForEvent(
    registrationData: EventRegistrationDto
): Promise<void> {
    try {
        await userClient.post("/events/register", registrationData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                throw new Error("Invalid event registration request");
            } else if (error.response?.status === 404) {
                throw new Error(
                    `Event with ID ${registrationData.eventId} not found`
                );
            }
        }
        console.error("Error registering for event:", error);
        throw error;
    }
}

/**
 * Unregisters the current user from an event.
 *
 * @param {EventRegistrationDto} unregistrationData - The event unregistration data
 * @returns {Promise<void>} Empty promise on successful unregistration
 * @throws {Error} If unregistration fails or returns an error status
 */
export async function unregisterFromEvent(
    unregistrationData: EventRegistrationDto
): Promise<void> {
    try {
        await userClient.delete("/events/unregister", {
            data: unregistrationData,
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                throw new Error("Invalid event unregistration request");
            } else if (error.response?.status === 404) {
                throw new Error(
                    `Event with ID ${unregistrationData.eventId} not found`
                );
            }
        }
        console.error("Error unregistering from event:", error);
        throw error;
    }
}

/**
 * Retrieves all events that the current user is registered for.
 *
 * @returns {Promise<EventResponseDto[]>} Array of event objects
 * @throws {Error} If the request fails or returns an error status
 */
export async function getMyRegisteredEvents(): Promise<EventResponseDto[]> {
    try {
        const response = await userClient.get("/events/my/registered");
        return Array.isArray(response.data)
            ? response.data
            : response.data.data;
    } catch (error) {
        console.error("Error fetching registered events:", error);
        throw error;
    }
}

/**
 * Checks if the current user is registered for a specific event.
 *
 * @param {string} eventId - The unique identifier of the event
 * @returns {Promise<boolean>} True if registered, false otherwise
 * @throws {Error} If the request fails or returns an error status
 */
export async function checkEventRegistrationStatus(
    eventId: string
): Promise<boolean> {
    try {
        const response = await userClient.get(`/events/${eventId}/registered`);
        return response.data.registered;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error(`Event with ID ${eventId} not found`);
        }
        console.error("Error checking event registration status:", error);
        throw error;
    }
}
