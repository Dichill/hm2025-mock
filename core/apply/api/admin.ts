import { applicationClient } from "@/api/application-client";
import { UpdateApplicationStatusDto } from "../types/application.dto";
import { ApplicationResponseDto } from "../types/apply.dto";
import axios from "axios";


export async function updateApplicationStatus(
    updateData: UpdateApplicationStatusDto
): Promise<ApplicationResponseDto> {
    try {
        const response = await applicationClient.post(
            "/admin/applications/status",
            updateData
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error(
                    `Application with ID ${updateData.applicationId} not found`
                );
            } else if (error.response?.status === 400) {
                throw new Error("Invalid application status update request");
            }
        }
        console.error("Error updating application status:", error);
        throw error;
    }
}
