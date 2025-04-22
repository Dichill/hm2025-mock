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
