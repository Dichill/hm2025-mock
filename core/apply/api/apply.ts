import {
    ApplicationDto,
    ApplicationResponseDto,
    ApplicationStatus,
} from "../types/apply.dto";
import { applicationClient } from "@/api/application-client";

export async function createApplication(
    applicationData: ApplicationDto,
    resumeFile?: File
): Promise<ApplicationResponseDto> {
    try {
        const formData = new FormData();

        Object.entries(applicationData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            } else if (typeof value === "boolean") {
                formData.append(key, value.toString());
            } else if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });

        if (resumeFile) {
            formData.append("resume", resumeFile);
        }

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const response = await applicationClient.post(
            "/applications",
            formData,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error creating application:", error);
        throw error;
    }
}

export async function saveApplication(
    applicationData: Partial<ApplicationDto>,
    resumeFile?: File
): Promise<ApplicationResponseDto> {
    try {
        const formData = new FormData();

        formData.append("status", ApplicationStatus.SAVED);

        Object.entries(applicationData).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                return;
            }

            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            } else if (typeof value === "boolean") {
                formData.append(key, value.toString());
            } else {
                formData.append(key, value.toString());
            }
        });

        if (resumeFile) {
            formData.append("resume", resumeFile);
        }

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const response = await applicationClient.post(
            "/applications/save",
            formData,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error saving application:", error);
        throw error;
    }
}

export async function getCurrentApplication(): Promise<ApplicationResponseDto | null> {
    try {
        const response = await applicationClient.get("/applications/me");
        return response.data;
    } catch (error) {
        console.error("Error fetching current application:", error);
        return null;
    }
}

export async function updateApplication(
    applicationId: string,
    applicationData: ApplicationDto,
    resumeFile?: File
): Promise<ApplicationResponseDto> {
    try {
        // Create FormData object for multipart/form-data submission
        const formData = new FormData();

        // Add all application fields to the form data
        Object.entries(applicationData).forEach(([key, value]) => {
            // Handle arrays (primarySkills, dietaryRestrictions, otherSkill)
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            }
            // Handle booleans
            else if (typeof value === "boolean") {
                formData.append(key, value.toString());
            }
            // Handle other primitive values
            else if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });

        if (resumeFile) {
            formData.append("resume", resumeFile);
        }

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const response = await applicationClient.patch(
            `/applications/${applicationId}`,
            formData,
            config
        );
        return response.data;
    } catch (error) {
        console.error(`Error updating application ${applicationId}:`, error);
        throw error;
    }
}
