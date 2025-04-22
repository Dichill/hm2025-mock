import { userClient } from "@/api/user-client";
import { NotifyNonApplicantsResponse, StudentData } from "../types/admin.dto";

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
