import {
    ApplicationDto,
    ApplicationResponseDto,
    ApplicationStatus,
    ApplicationsPageDto,
    School,
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

export async function submitApplication(
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
            "/applications/submit",
            formData,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error submitting application:", error);
        throw error;
    }
}

export async function getAllApplications(
    page: number = 1,
    limit: number = 10,
    status?: ApplicationStatus,
    school?: School,
    search?: string
): Promise<ApplicationsPageDto> {
    try {
        const params: Record<string, string | number> = {
            page,
            limit,
        };

        if (status) {
            params.status = status;
        }

        if (school) {
            params.school = school;
        }

        if (search) {
            params.search = search;
        }

        const response = await applicationClient.get("/applications", {
            params,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching applications:", error);
        throw error;
    }
}

export async function getApplicationById(
    applicationId: string
): Promise<ApplicationDto> {
    try {
        const response = await applicationClient.get(
            `/applications/${applicationId}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching application ${applicationId}:`, error);
        throw error;
    }
}

export async function unregisterFromHackathon(): Promise<{ message: string }> {
    try {
        const response = await applicationClient.post(
            "/applications/unregister"
        );
        return response.data;
    } catch (error) {
        console.error("Error unregistering from hackathon:", error);
        throw error;
    }
}

export async function searchApplications(
    searchTerm: string,
    page: number = 1,
    limit: number = 10
): Promise<ApplicationsPageDto> {
    try {
        const response = await applicationClient.get("/applications/search", {
            params: {
                q: searchTerm,
                page,
                limit,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error searching applications:", error);
        throw error;
    }
}
